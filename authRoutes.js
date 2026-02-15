const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateTasteProfile,
  saveRecipe,
  getSavedRecipes,
  removeSavedRecipe
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const { uploadMedicalReport } = require("../controllers/medicalController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);
router.put("/taste", protect, updateTasteProfile);

router.post("/save", protect, saveRecipe);
router.get("/saved", protect, getSavedRecipes);
router.delete("/remove/:id", protect, removeSavedRecipe);
router.post(
  "/upload-report",
  protect,
  upload.single("report"),
  uploadMedicalReport
);


module.exports = router;
