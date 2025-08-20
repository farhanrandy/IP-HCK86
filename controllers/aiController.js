// Controller untuk AI (Gemini) cover letter
const { getGeminiClient } = require('../utils/gemini');

module.exports = {
  // POST /ai/cover-letter
  async generateCoverLetter(req, res, next) {
    try {
      // ambil input sederhana
      const { resume_text = '', job_description = '', tone = 'profesional', lang = 'id' } = req.body;
      if (!resume_text || !job_description) {
        return res.status(400).json({ message: 'resume_text and job_description are required' });
      }

      // Siapkan prompt yang mudah dimengerti
      const targetLang = (lang || 'id').toLowerCase() === 'en' ? 'English' : 'Bahasa Indonesia';
      const wordLimit = 180; // batas ±180 kata

      const prompt = [
        `You are a helpful assistant that writes short, clear cover letters in ${targetLang}.`,
        `Limit output to around ${wordLimit} words.`,
        `Tone: ${tone}.`,
        ``,
        `=== RESUME TEXT ===`,
        resume_text,
        ``,
        `=== JOB DESCRIPTION ===`,
        job_description,
        ``,
        `Write a concise cover letter tailored to the job, focusing on skills match, impact, and a friendly closing.`
      ].join('\n');

      const client = getGeminiClient();

      // SDK baru memanggil generateContent langsung dari module models
      const result = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      const text = result?.text || 'Maaf, tidak ada output.';

      res.json({ message: 'OK', cover_letter: text });
    } catch (err) {
      next(err);
    }
  },
};
