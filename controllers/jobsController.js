// // Controller untuk pencarian jobs
// const { searchJobs } = require('../utils/serpApi');

// function normalizeGoogleJobs(raw) {
//   // Normalisasi hasil dari google_jobs (SerpAPI)
//   const results = raw?.jobs_results || raw?.google_jobs_results || raw?.jobs || [];
//   const normalized = (results || []).map((job) => {
//     // Field umum yang sering ada di google_jobs results
//     return {
//       title: job.title || '',
//       company: job.company_name || job.company || '',
//       location: job.location || '',
//       via: job.via || '',
//       detected_extensions: job.detected_extensions || {},
//       description: job.description || job.snippet || '',
//       job_id: job.job_id || job.jobId || job.id || '',
//       apply_link: job.apply_link || (job.apply_options && job.apply_options[0]?.link) || job.link || '',
//       thumbnail: job.thumbnail || '',
//       source: 'google', // sesuai enum
//       raw: job, // simpan raw kalau mau lihat
//     };
//   });
//   return normalized;
// }

// function dedupeByKey(arr) {
//   // Dedupe sederhana berdasarkan title + company + location
//   const seen = new Set();
//   const out = [];
//   for (const item of arr) {
//     const key = `${item.title}|${item.company}|${item.location}`.toLowerCase();
//     if (!seen.has(key)) {
//       seen.add(key);
//       out.push(item);
//     }
//   }
//   return out;
// }

// module.exports = {
//   // GET /jobs/search?q=&location=&page=
//   async searchJobs(req, res, next) {
//     try {
//       const { q = '', location = '', page = 0 } = req.query;

//       const raw = await searchJobs({ q, location, page });
//       const normalized = normalizeGoogleJobs(raw);
//       const deduped = dedupeByKey(normalized);

//       res.json({ query: { q, location, page: Number(page) }, count: deduped.length, jobs: deduped });
//     } catch (err) {
//       next(err);
//     }
//   },
// };

// controllers/jobsController.js
const { searchJobs } = require('../utils/serpApi');

// Normalisasi sesuai sample JSON kamu
function normalizeGoogleJobs(raw) {
  const results = raw?.jobs_results || []; // <-- ini kuncinya

  return results.map(job => ({
    title: job.title || '',
    company: job.company_name || '',
    location: job.location || '',
    posted_at: job.detected_extensions?.posted_at || job.extensions?.[0] || '',
    schedule_type: job.detected_extensions?.schedule_type || '',
    description: job.description || '',
    apply_link:
      job.apply_options?.[0]?.link ||
      job.share_link ||
      '',
    job_id: job.job_id || '',
    source: 'google'
  }));
}

// Dedupe sederhana (title+company+location)
function dedupeByKey(list) {
  const seen = new Set();
  const out = [];
  for (const j of list) {
    const key = `${j.title}|${j.company}|${j.location}`.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(j);
    }
  }
  return out;
}

module.exports = {
  // GET /jobs/search?q=&location=&next_page_token=
  async searchJobs(req, res, next) {
    try {
      const { q = '', location = '', next_page_token = '' } = req.query;
      if (!q.trim()) throw { status: 400, message: 'Query q is required' };

      const raw = await searchJobs({ q, location, next_page_token });

      // (opsional) debug sekali aja kalau masih kosong:
      // console.log('jobs_results length:', raw?.jobs_results?.length);

      const normalized = normalizeGoogleJobs(raw);
      const deduped = dedupeByKey(normalized);

      res.json({
        query: { q, location },
        count: deduped.length,
        next_page_token:
          raw?.serpapi_pagination?.next_page_token || raw?.next_page_token || null,
        jobs: deduped
      });
    } catch (err) {
      if (err.response) {
        const s = err.response.status || 500;
        const m = err.response.data?.error || err.response.data?.message || 'Upstream error';
        return next({ status: s, message: `SerpAPI: ${m}` });
      }
      next(err);
    }
  }
};
