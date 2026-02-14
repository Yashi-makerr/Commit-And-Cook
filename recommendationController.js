const Recipe = require("../models/Recipe");
const User = require("../models/User");
const flavorDB = require("../utils/flavorDB");
const { fetchExternalRecipes } = require("../services/externalRecipeService");

const calculateHealthPenalty = (user, recipe) => {
  let penalty = 0;

  if (user.healthProfile?.diabetes && recipe.nutrition?.glycemicIndex > 60)
    penalty += 15;

  if (user.healthProfile?.hypertension && recipe.nutrition?.macronutrients?.sodium > 400)
    penalty += 15;

  if (user.healthProfile?.cholesterol === "high" &&
      recipe.nutrition?.macronutrients?.fat > 15)
    penalty += 10;

  if (recipe.medicalFlags?.lowSugar === false &&
      user.dietRestrictions?.includes("low sugar"))
    penalty += 10;

  return penalty;
};

const calculateTasteScore = (userTaste, recipeTaste) => {
  const keys = ["sweet", "spicy", "bitter", "sour", "umami"];
  let distance = 0;

  for (let key of keys) {
    distance += Math.abs(
      (userTaste?.[key] || 5) - (recipeTaste?.[key] || 5)
    );
  }

  return 100 - Math.min((distance / 50) * 100, 100);
};

const calculateMolecularScore = (favoriteIngredients, ingredients) => {
  let score = 0;

  for (let ingredient of ingredients) {
    const compounds = flavorDB[ingredient.name?.toLowerCase()] || [];

    for (let fav of favoriteIngredients) {
      const favCompounds = flavorDB[fav.toLowerCase()] || [];
      const shared = compounds.filter(c => favCompounds.includes(c));
      score += shared.length;
    }
  }

  return Math.min(score * 5, 100);
};

const recommendRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    let recipes = await Recipe.find({
      cuisine: { $regex: user.cuisinePreference || "", $options: "i" }
    }).lean();

    if (recipes.length < 5) {
      const external = await fetchExternalRecipes(
        user.cuisinePreference || "Indian"
      );
      recipes = [...recipes, ...external];
    }

    const scoredRecipes = [];

    for (let recipe of recipes) {

      const tasteScore = calculateTasteScore(
        user.tasteProfile,
        recipe.tasteProfile
      );

      const molecularScore = calculateMolecularScore(
        user.favoriteIngredients || [],
        recipe.ingredients || []
      );

      const healthPenalty = calculateHealthPenalty(user, recipe);

      const baseAI = recipe.aiIntelligence?.hybridBaseScore || 50;

      const finalScore =
        tasteScore * 0.35 +
        molecularScore * 0.25 +
        baseAI * 0.25 -
        healthPenalty * 0.15;

      scoredRecipes.push({
        _id: recipe._id,
        title: recipe.title,
        image: recipe.image,
        hybridScore: Math.max(Math.round(finalScore), 0),
        explanation: {
          tasteMatch: `${Math.round(tasteScore)}% taste similarity`,
          molecularMatch: `${Math.round(molecularScore)}% flavor pairing`,
          healthImpact:
            healthPenalty === 0 ? "Highly Safe" : "Moderate Risk"
        }
      });
    }

    scoredRecipes.sort((a, b) => b.hybridScore - a.hybridScore);

    return res.status(200).json(scoredRecipes.slice(0, 5));

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { recommendRecipes };
