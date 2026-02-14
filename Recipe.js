const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  category: String
}, { _id: false });

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    description: String,

    cuisine: { type: String, required: true },

    originRegion: String,

    mealType: [String],
    occasion: [String],
    climateSuitability: [String],

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },

    prepTime: Number,
    cookTime: Number,
    totalTime: Number,
    servings: Number,

    image: String,

    ingredients: [ingredientSchema],

    instructions: [String],

    nutrition: {
      caloriesPerServing: Number,
      macronutrients: {
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number,
        sugar: Number,
        sodium: Number
      },
      micronutrients: {
        iron: Number,
        calcium: Number,
        vitaminC: Number,
        potassium: Number
      },
      glycemicIndex: Number
    },

    dietTags: [String],
    allergens: [String],

    medicalFlags: {
      lowSodium: Boolean,
      lowSugar: Boolean,
      lowFat: Boolean
    },

    healthCompatibility: {
      diabetesScore: Number,
      hypertensionScore: Number,
      cholesterolScore: Number
    },

    tasteProfile: {
      sweet: Number,
      spicy: Number,
      bitter: Number,
      sour: Number,
      umami: Number
    },

    flavorCompounds: [String],

    flavorPairingScore: Number,

    aiIntelligence: {
      embedding: [Number],
      confidenceScore: Number,
      hybridBaseScore: Number
    },

    costEstimate: {
      currency: String,
      amount: Number
    },

    similarRecipes: [String],

    adminMeta: {
      validated: Boolean,
      lastFlavorCheck: Date,
      source: String
    }
  },
  { timestamps: true }
);

/* ===============================
   PERFORMANCE INDEXES
================================= */

recipeSchema.index({ slug: 1 }, { unique: true });
recipeSchema.index({ cuisine: 1 });
recipeSchema.index({ dietTags: 1 });
recipeSchema.index({ "nutrition.glycemicIndex": 1 });
recipeSchema.index({ "nutrition.macronutrients.sodium": 1 });
recipeSchema.index({ "tasteProfile.spicy": 1 });

module.exports = mongoose.model("Recipe", recipeSchema);
