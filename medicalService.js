// services/medicalService.js

const calculateHealthScore = (healthProfile, dietRestrictions) => {
  let score = 100;

  if (healthProfile.diabetes) score -= 20;
  if (healthProfile.hypertension) score -= 15;
  if (healthProfile.cholesterol === "high") score -= 15;

  if (dietRestrictions.includes("low sugar")) score -= 10;
  if (dietRestrictions.includes("low sodium")) score -= 10;
  if (dietRestrictions.includes("low fat")) score -= 5;

  return Math.max(score, 40);
};


const parseMedicalText = (text) => {
  const lowerText = text.toLowerCase();

  const healthProfile = {
    diabetes: false,
    hypertension: false,
    cholesterol: "normal"
  };

  const dietRestrictions = [];

  // 🔍 Condition Detection
  if (lowerText.includes("diabetes") || lowerText.includes("high sugar")) {
    healthProfile.diabetes = true;
    dietRestrictions.push("low sugar");
  }

  if (lowerText.includes("hypertension") || lowerText.includes("high bp")) {
    healthProfile.hypertension = true;
    dietRestrictions.push("low sodium");
  }

  if (lowerText.includes("high cholesterol")) {
    healthProfile.cholesterol = "high";
    dietRestrictions.push("low fat");
  }

  const healthScore = calculateHealthScore(
    healthProfile,
    dietRestrictions
  );

  return {
    healthProfile,
    dietRestrictions,
    healthScore
  };
};


module.exports = {
  parseMedicalText,
  calculateHealthScore
};
