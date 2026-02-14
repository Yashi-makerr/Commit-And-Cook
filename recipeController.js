const {
  getRecipesByCalories,
  getRecipesByTitle,
  getRecipesByCuisine
} = require("../services/recipeService");

const { fetchRecipeById } = require("../services/externalRecipeService");
const Recipe = require("../models/Recipe");
const User = require("../models/User");

// =============================
// 🔄 Common Formatter
// =============================
const formatRecipes = (recipes) => {
  return recipes.map(recipe => ({
    id: recipe._id || recipe.id,
    title: recipe.title || recipe.Recipe_title,
    calories: Number(recipe.Calories || recipe.calories || 0),
    cookTime: Number(recipe.cook_time || recipe.cookTime || 0),
    prepTime: Number(recipe.prep_time || recipe.prepTime || 0),
    region: recipe.Region || recipe.region || ""
  }));
};

// =============================
// ➕ CREATE RECIPE (Mongo)
// =============================
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 📥 GET ALL RECIPES (Mongo)
// =============================
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 🔥 CALORIES (External API)
// =============================
const fetchRecipesByCalories = async (req, res) => {
  try {
    const { min, max } = req.query;

    const apiResponse = await getRecipesByCalories(min, max);
    const recipes = formatRecipes(apiResponse.data || []);

    res.status(200).json({
      success: true,
      totalResults: apiResponse.pagination?.totalResults || 0,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 🔎 TITLE (External API)
// =============================
const fetchRecipesByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const apiResponse = await getRecipesByTitle(title);
    const recipes = formatRecipes(apiResponse.data || []);

    res.status(200).json({
      success: true,
      totalResults: apiResponse.pagination?.totalResults || 0,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 🌍 CUISINE (External API)
// =============================
const fetchRecipesByCuisine = async (req, res) => {
  try {
    const { region } = req.params;

    const apiResponse = await getRecipesByCuisine(region);
    const recipes = formatRecipes(apiResponse.data || []);

    res.status(200).json({
      success: true,
      totalResults: apiResponse.pagination?.totalResults || 0,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 🔍 SEARCH
// =============================
const searchRecipes = async (req, res) => {
  try {
    const { min, max, title, cuisine } = req.query;

    let apiResponse;

    if (cuisine) {
      apiResponse = await getRecipesByCuisine(cuisine);
    } else if (title) {
      apiResponse = await getRecipesByTitle(title);
    } else if (min && max) {
      apiResponse = await getRecipesByCalories(min, max);
    } else {
      return res.status(400).json({
        success: false,
        message: "Provide at least one filter"
      });
    }

    const recipes = formatRecipes(apiResponse.data || []);

    res.status(200).json({
      success: true,
      totalResults: recipes.length,
      data: recipes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =============================
// 💾 SAVE RECIPE
// =============================
const saveRecipe = async (req, res) => {
  try {
    const { recipeId, title, image } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = user.savedRecipes.find(
      (r) => r.recipeId === recipeId
    );

    if (alreadySaved) {
      return res.status(400).json({
        message: "Recipe already saved"
      });
    }

    user.savedRecipes.push({
      recipeId,
      title,
      image
    });

    await user.save();

    res.status(200).json({
      message: "Recipe saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// =============================
// 📖 GET EXTERNAL RECIPE DETAILS
// =============================
const getExternalRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await fetchRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({
      success: true,
      data: recipe
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// =============================
// EXPORTS
// =============================
module.exports = {
  fetchRecipesByCalories,
  fetchRecipesByTitle,
  fetchRecipesByCuisine,
  searchRecipes,
  createRecipe,
  getAllRecipes,
  saveRecipe,
  getExternalRecipeById
};
