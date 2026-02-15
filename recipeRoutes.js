const express = require("express");
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  fetchRecipesByCalories,
  fetchRecipesByTitle,
  fetchRecipesByCuisine,
  searchRecipes,
  saveRecipe,
  getExternalRecipeById
} = require("../controllers/recipeController");

const { recommendRecipes } = require("../controllers/recommendationController");
const { protect } = require("../middleware/authMiddleware");

// BASIC ROUTES
router.post("/", createRecipe);
router.get("/", getAllRecipes);

router.get("/calories", fetchRecipesByCalories);
router.get("/title", fetchRecipesByTitle);
router.get("/cuisine/:region", fetchRecipesByCuisine);
router.get("/search", searchRecipes);

// EXTERNAL DETAIL
router.get("/external/:id", protect, getExternalRecipeById);

// RECOMMEND
router.get("/recommend", protect, recommendRecipes);

// SAVE
router.post("/save", protect, saveRecipe);

module.exports = router;
