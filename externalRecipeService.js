const axios = require("axios");

const BASE_URL = process.env.FOODOSCOPE_BASE_URL;
const API_KEY = process.env.FOODOSCOPE_API_KEY;

// Reusable Axios instance
const externalAPI = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
});

// ================================
// 🍽 Fetch Recipes By Cuisine
// ================================
const fetchExternalRecipes = async (cuisine) => {
  try {
    if (!BASE_URL || !API_KEY) {
      console.log("❌ Missing API configuration");
      return [];
    }

    const response = await externalAPI.get(
      `/recipe2-api/recipes_cuisine/cuisine/${encodeURIComponent(cuisine)}`,
      {
        params: {
          page: 1,
          page_size: 20
        }
      }
    );

    const recipes = response.data?.data || [];

    // 🔥 Normalize external data to match your MongoDB schema
    return recipes.map((recipe) => ({
      id: recipe._id || recipe.id,
      title: recipe.title || recipe.Recipe_title,
      cuisine: recipe.cuisine || cuisine,
      ingredients: recipe.ingredients || [],
      image: recipe.image || null,
      sugar: recipe.sugar || 0,
      sodium: recipe.sodium || 0,
      fat: recipe.fat || 0,
      carbs: recipe.carbs || 0,
      sweet: recipe.sweet || 5,
      spicy: recipe.spicy || 5,
      bitter: recipe.bitter || 5,
      sour: recipe.sour || 5,
      umami: recipe.umami || 5
    }));

  } catch (err) {
    console.error("❌ External Recipe API Error:", err.response?.data || err.message);
    return [];
  }
};

// ================================
// 📖 Fetch Single Recipe By ID
// ================================
const fetchRecipeById = async (recipeId) => {
  try {
    if (!BASE_URL || !API_KEY) {
      console.log("❌ Missing API configuration");
      return null;
    }

    const response = await externalAPI.get(
      `/recipe2-api/recipe-details/${recipeId}`
    );

    const recipe = response.data?.data;

    if (!recipe) return null;

    // 🔥 Normalize detail response
    return {
      id: recipe._id || recipe.id,
      title: recipe.title,
      description: recipe.description,
      cuisine: recipe.cuisine,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      nutrition: recipe.nutrition || {},
      image: recipe.image || null,
      sugar: recipe.sugar || 0,
      sodium: recipe.sodium || 0,
      fat: recipe.fat || 0,
      carbs: recipe.carbs || 0,
      sweet: recipe.sweet || 5,
      spicy: recipe.spicy || 5,
      bitter: recipe.bitter || 5,
      sour: recipe.sour || 5,
      umami: recipe.umami || 5
    };

  } catch (err) {
    console.error("❌ External Recipe Detail API Error:", err.response?.data || err.message);
    return null;
  }
};

module.exports = {
  fetchExternalRecipes,
  fetchRecipeById
};
