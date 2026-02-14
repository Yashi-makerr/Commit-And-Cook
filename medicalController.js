const fs = require("fs");
const pdfParse = require("pdf-parse");
const User = require("../models/User");

// ================================
// 🏥 Upload Medical Report
// ================================
const uploadMedicalReport = async (req, res) => {
  try {
    // 1️⃣ Check file exists
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    // 2️⃣ Read file buffer
    const fileBuffer = fs.readFileSync(req.file.path);

    // 3️⃣ Extract text from PDF
    const data = await pdfParse(fileBuffer);
    const text = data.text.toLowerCase();

    // ================================
    // 🧠 Smart Detection Logic
    // ================================

    const diabetesDetected =
      text.includes("diabetes") ||
      text.includes("blood sugar high") ||
      text.includes("glucose high");

    const hypertensionDetected =
      text.includes("hypertension") ||
      text.includes("high blood pressure");

    let cholesterolLevel = "normal";

    if (
      text.includes("cholesterol high") ||
      text.includes("ldl high") ||
      text.includes("hyperlipidemia")
    ) {
      cholesterolLevel = "high";
    }

    // ================================
    // 📦 Construct HealthProfile
    // ================================
    const healthProfile = {
      diabetes: diabetesDetected,
      hypertension: hypertensionDetected,
      cholesterol: cholesterolLevel
    };

    // ================================
    // 🧮 Auto Diet Restrictions
    // ================================
    let dietRestrictions = [];

    if (diabetesDetected) dietRestrictions.push("low sugar");
    if (hypertensionDetected) dietRestrictions.push("low sodium");
    if (cholesterolLevel === "high") dietRestrictions.push("low fat");

    // ================================
    // 📊 Auto Health Score Calculation
    // ================================
    let healthScore = 100;

    if (diabetesDetected) healthScore -= 20;
    if (hypertensionDetected) healthScore -= 15;
    if (cholesterolLevel === "high") healthScore -= 15;

    healthScore = Math.max(healthScore, 40);

    // ================================
    // 💾 Save to User
    // ================================
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.healthProfile = healthProfile;
    user.dietRestrictions = dietRestrictions;
    user.healthScore = healthScore;

    await user.save();

    // Optional: Delete uploaded file after processing
    fs.unlinkSync(req.file.path);

    // ================================
    // 🎉 Response
    // ================================
    res.status(200).json({
      message: "Medical report processed successfully",
      healthProfile,
      dietRestrictions,
      healthScore
    });

  } catch (error) {
    console.error("Medical upload error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { uploadMedicalReport };
