const { query, param, validationResult } = require("express-validator");

// 🔥 Calories Validation
const validateCalories = [
  query("min")
    .exists().withMessage("Min is required")
    .isNumeric().withMessage("Min must be a number"),

  query("max")
    .exists().withMessage("Max is required")
    .isNumeric().withMessage("Max must be a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];


// 🔎 Title Validation
const validateTitle = [
  query("title")
    .exists().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 2 }).withMessage("Title must be at least 2 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];


// 🌍 Cuisine Validation (Path Param)
const validateCuisine = [
  param("region")
    .exists().withMessage("Cuisine region is required")
    .isString().withMessage("Cuisine must be string")
    .isLength({ min: 3 }).withMessage("Cuisine too short"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateCalories,
  validateTitle,
  validateCuisine
};
