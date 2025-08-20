// Inisialisasi Google Gemini sederhana
const { GoogleGenerativeAI } = require('@google/genai');

function getGeminiClient() {
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

module.exports = { getGeminiClient };
