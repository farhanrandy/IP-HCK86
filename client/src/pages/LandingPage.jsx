import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function LandingPage(){
  const token = useSelector(s=>s.auth.token)
  return (
    <section className="mx-auto max-w-3xl py-16 text-center">
      <h1 className="text-3xl font-semibold">Cari kerja lebih cepat</h1>
      <p className="mt-2 text-zinc-600">Search lowongan, simpan yang cocok, dan buat cover letter otomatis berbasis resume kamu.</p>
      <div className="mt-6 flex justify-center gap-3">
        {token ? (
          <Link to="/jobs" className="rounded-lg bg-zinc-900 px-4 py-2 text-white">Mulai Cari Pekerjaan</Link>
        ) : (
          <Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white">Login dengan Google</Link>
        )}
      </div>
    </section>
  )
}
