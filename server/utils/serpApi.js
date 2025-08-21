// // Panggil SerpAPI untuk Google Jobs
// const axios = require('axios');

// // Normalisasi field agar seragam & dedupe sederhana di controller
// async function searchJobs({ q = '', location = '', page = 0 }) {
//   // page -> SerpAPI gunakan 'start' (kelipatan 10) untuk pagination
//   const start = Number(page) * 10;
//   const params = {
//     engine: 'google_jobs',
//     q,
//     location,
//     api_key: process.env.SERPAPI_KEY,
//     start,
//   };

//   const { data } = await axios.get('https://serpapi.com/search.json', { params });
//   return data;
// }

// module.exports = { searchJobs };

// utils/serpApi.js
const axios = require('axios');

// Ambil halaman pertama (bisa ditambah next_page_token nanti)
async function searchJobs({ q = '', location = '', next_page_token = '' }) {
  const params = {
    engine: 'google_jobs',
    q,
    location,     // contoh: "Jakarta, Indonesia"
    hl: 'id',
    gl: 'id',
    api_key: process.env.SERPAPI_KEY,
  };
  if (next_page_token) params.next_page_token = next_page_token;

  const { data } = await axios.get('https://serpapi.com/search.json', { params });
  return data;
}

module.exports = { searchJobs };
