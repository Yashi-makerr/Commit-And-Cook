const mongoose = require("mongoose");

const tasteProfileSchema = new mongoose.Schema({
  sweet: { type: Number, default: 5, min: 0, max: 10 },
  spicy: { type: Number, default: 5, min: 0, max: 10 },
  bitter: { type: Number, default: 5, min: 0, max: 10 },
  sour: { type: Number, default: 5, min: 0, max: 10 },
  umami: { type: Number, default: 5, min: 0, max: 10 }
}, { _id: false });

const healthProfileSchema = new mongoose.Schema({
  diabetes: { type: Boolean, default: false },
  hypertension: { type: Boolean, default: false },
  cholesterol: {
    type: String,
    enum: ["normal", "high"],
    default: "normal"
  }
}, { _id: false });

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true   // ✅ unique automatically creates index
    },

    password: { type: String, required: true },

    tasteProfile: {
      type: tasteProfileSchema,
      default: () => ({})
    },

    healthProfile: {
      type: healthProfileSchema,
      default: () => ({})
    },

    dietRestrictions: {
      type: [String],
      default: []
    },

    healthScore: {
      type: Number,
      default: 100
    },

    cuisinePreference: {
      type: String,
      default: "Indian"
    },

    favoriteIngredients: {
      type: [String],
      default: []
    },

    savedRecipes: [
      {
        recipeId: String,
        title: String,
        image: String
      }
    ]
  },
  { timestamps: true }
);

/* ===============================
   INDEXES (ONLY HERE – NO DUPLICATE)
================================= */

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ cuisinePreference: 1 });
userSchema.index({ "healthProfile.diabetes": 1 });

module.exports = mongoose.model("User", userSchema);
