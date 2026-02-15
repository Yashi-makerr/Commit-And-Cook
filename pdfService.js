const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {

  try {

    if (!fs.existsSync(filePath)) {
      return "";
    }

    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    return data.text || "";

  } catch (err) {

    console.log("PDF parsing failed:", err.message);

    return "";

  }

};

module.exports = { extractTextFromPDF };
