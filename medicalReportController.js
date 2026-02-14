const fs = require("fs");
const User = require("../models/User");
const { parseMedicalText } = require("../services/medicalService");
const { extractTextFromPDF } = require("../services/pdfService");

const uploadMedicalReport = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const filePath = req.file.path;

    console.log("PDF received:", filePath);

    // extract text safely
    const text = await extractTextFromPDF(filePath);

    let parsed = {
      healthProfile: {
        diabetes: false,
        hypertension: false,
        cholesterol: "normal"
      },
      dietRestrictions: [],
      healthScore: 100
    };

    // parse only if text exists
    if (text && text.trim().length > 0) {

      parsed = parseMedicalText(text);

      console.log("Parsed health:", parsed);

    } else {

      console.log("PDF had no readable text, using default profile");

    }

    // ALWAYS return success
    return res.status(200).json({

      message: "Report uploaded successfully",

      parsed: parsed,

      file: req.file.filename

    });

  } catch (error) {

    console.error("MEDICAL REPORT ERROR:", error);

    return res.status(500).json({
      message: "Report processing failed"
    });

  }

};

module.exports = {
  uploadMedicalReport
};
