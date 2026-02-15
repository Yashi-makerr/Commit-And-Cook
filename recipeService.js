const axios = require("axios");

const BASE_URL = process.env.FOODOSCOPE_BASE_URL;
const API_KEY = process.env.FOODOSCOPE_API_KEY;

// =============================
// 🔥 RECIPE DB
// =============================

const getRecipesByCalories = async (min, max) => {
  const response = await axios.get(
    `${BASE_URL}/recipe2-api/recipes-calories/calories`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { min, max }
    }
  );
  return response.data;
};

const getRecipesByTitle = async (title) => {
  const response = await axios.get(
    `${BASE_URL}/recipe2-api/recipe-bytitle/recipeByTitle`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { title }
    }
  );
  return response.data;
};

const getRecipesByCuisine = async (region) => {
  const response = await axios.get(
    `${BASE_URL}/recipe2-api/recipes_cuisine/cuisine/${encodeURIComponent(region)}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params: { page: 1, page_size: 10 }
    }
  );
  return response.data;
};

// =============================
// 🧠 FLAVOR DB
// =============================

const getTasteThreshold = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/flavordb/properties/taste-threshold`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
      params
    }
  );
  return response.data;
};

const getIngredientFlavor = async (ingredientName) => {
  const response = await axios.get(
    `${BASE_URL}/flavordb/ingredients/${encodeURIComponent(ingredientName)}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` }
    }
  );
  return response.data;
};

module.exports = {
  getRecipesByCalories,
  getRecipesByTitle,
  getRecipesByCuisine,
  getTasteThreshold,
  getIngredientFlavor
};
