const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeMedicalText = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a medical analyzer.

Extract:
- diabetes: true/false
- hypertension: true/false
- cholesterol: normal/high

Medical report:
${text}

Return ONLY JSON format like:
{
 "diabetes": false,
 "hypertension": false,
 "cholesterol": "normal"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return JSON.parse(response);

  } catch (err) {
    console.error("Gemini failed:", err.message);
    return null;
  }
};

module.exports = { analyzeMedicalText };
