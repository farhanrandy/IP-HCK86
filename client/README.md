# Job Finder + AI Cover Letter (Frontend — Student Friendly)
React + Vite + Redux Toolkit + Axios. Tailwind via CDN. Kode sederhana dengan komentar.

## Jalankan
1. `npm i`
2. Copy `.env.example` → `.env` dan set `VITE_API_URL=http://localhost:4000`
3. `npm run dev`

## Google Sign-In (GSI)
- Edit `src/pages/LoginPage.jsx`, ganti `YOUR_GOOGLE_CLIENT_ID` dengan Client ID milikmu.
- GSI akan merender tombol otomatis. Jika belum siap, ada tombol `Dev Login (stub)` untuk testing.

## Flow Halaman
- **Landing**: CTA login → /jobs jika sudah login.
- **Login**: tombol GSI → idToken → POST `/auth/google` → simpan token → /jobs.
- **Jobs**: jika `q` kosong → instruksi isi `q`. Kalau `q` ada → GET `/jobs/search?q=...`. Setiap kartu bisa `Save` (POST `/saved-jobs`).
- **Saved**: daftar dari `/saved-jobs`. Bisa `Open`, `Generate`, `Unsave`.
- **Resumes**: CRUD sederhana `/resumes`.
- **Saved Detail**: tampil jobPayload, tombol **Lamar via Situs** (`applyUrl`), pilih Resume + Bahasa (tone formal), **Generate AI** (`/ai/cover-letter`). Hasil `Copy` & `Download PDF` (print-to-PDF).
- **Settings**: bahasa default & default resume + info akun.

## Catatan
- Semua request (kecuali /auth/google) pakai header `Authorization: Bearer <token>`.
- 401 → auto-logout dan redirect ke /login.
- Deskripsi job disanitasi (DOMPurify).
- Download PDF dilakukan dari FE (teks tetap selectable).
