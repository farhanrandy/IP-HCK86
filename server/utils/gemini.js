// Inisialisasi Google Gemini menggunakan SDK terbaru
const { GoogleGenAI } = require('@google/genai');

// Membuat instance klien Gemini dengan API key
function getGeminiClient() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

module.exports = { getGeminiClient };
