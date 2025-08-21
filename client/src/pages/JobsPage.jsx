// import { useDispatch, useSelector } from 'react-redux'
// import { setQuery, fetchJobs } from '@/slices/jobsSlice'
// import { saveJob } from '@/slices/savedJobsSlice'
// import EmptyState from '@/components/ui/EmptyState'
// import ErrorState from '@/components/ui/ErrorState'
// import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

// export default function JobsPage(){
//   const dispatch = useDispatch()
//   const { q, results, status, error } = useSelector(s=>s.jobs)

//   const handleSearch = ()=>{
//     if (!q || !q.trim()) return
//     dispatch(fetchJobs(q.trim()))
//   }

//   const handleChip = (text)=>{
//     dispatch(setQuery(text))
//     dispatch(fetchJobs(text))
//   }

//   const handleSave = async (job)=>{
//     try{
//       await dispatch(saveJob({ jobExternalId: job.externalId, source: 'google', jobPayload: job })).unwrap()
//       alert('Tersimpan 🎉')
//     }catch(e){ alert('Gagal menyimpan') }
//   }

//   return (
//     <section className="space-y-4">
//       <div className="flex gap-2">
//         <input value={q} onChange={e=>dispatch(setQuery(e.target.value))} className="w-full rounded-lg border px-3 py-2" placeholder="Isi pekerjaan yang kamu inginkan" />
//         <button onClick={handleSearch} className="rounded-lg bg-zinc-900 px-4 py-2 text-white">Cari</button>
//       </div>

//       {!q ? (
//         <EmptyState
//           title="Mulai dengan mencari pekerjaan"
//           description="Isi kata kunci dulu. Contoh di bawah ini bisa diklik."
//           action={
//             <div className="flex flex-wrap justify-center gap-2">
//               {['Frontend Developer','UI/UX','Backend Node.js','Jakarta'].map((c)=>(
//                 <button key={c} onClick={()=>handleChip(c)} className="rounded-full border px-3 py-1 text-sm">{c}</button>
//               ))}
//             </div>
//           }
//         />
//       ) : status === 'loading' ? (
//         <LoadingSkeleton rows={4} />
//       ) : status === 'failed' ? (
//         <ErrorState message={error} onRetry={handleSearch} />
//       ) : !results?.length ? (
//         <EmptyState title="Tidak ada hasil" description="Coba kata kunci lain." />
//       ) : (
//         <div className="grid gap-3">
//           {results.map(job => (
//             <div key={job.externalId} className="rounded-xl border bg-white p-4">
//               <div className="flex items-start justify-between gap-2">
//                 <div>
//                   <h3 className="text-lg font-semibold">{job.title}</h3>
//                   <p className="text-sm text-zinc-600">{job.company} • {job.location}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button onClick={()=>handleSave(job)} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white">Save</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }
import { useDispatch, useSelector } from 'react-redux'
import { setQuery, setLocation, fetchJobs } from '@/slices/jobsSlice'
import { saveJob } from '@/slices/savedJobsSlice'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

export default function JobsPage(){
  const dispatch = useDispatch()
  const { q, location, results, status, error } = useSelector(s=>s.jobs)

  const handleSearch = ()=>{
    if (!q || !q.trim()) return
    dispatch(fetchJobs({ q: q.trim(), location: (location||'').trim() }))
  }

  const handleChip = (text, loc)=>{
    dispatch(setQuery(text))
    if (loc) dispatch(setLocation(loc))
    dispatch(fetchJobs({ q: text, location: loc }))
  }

  const handleSave = async (job)=>{
  try{
    await dispatch(saveJob({
      jobExternalId: job.externalId,   // ← dari normalizer
      source: 'google',
      jobPayload: job._raw || job      // simpan payload asli
    })).unwrap()
    alert('Tersimpan 🎉')
  }catch{
    alert('Gagal menyimpan')
  }
}

  return (
    <section className="space-y-4">
      {/* Bar pencarian + lokasi */}
      <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
        <input
          value={q}
          onChange={e=>dispatch(setQuery(e.target.value))}
          className="rounded-lg border px-3 py-2"
          placeholder="Isi pekerjaan yang kamu inginkan"
        />
        <input
          value={location}
          onChange={e=>dispatch(setLocation(e.target.value))}
          className="rounded-lg border px-3 py-2"
          placeholder="Lokasi (mis. Jakarta, Indonesia)"
        />
        <button onClick={handleSearch} className="rounded-lg bg-zinc-900 px-4 py-2 text-white">
          Cari
        </button>
      </div>

      {!q ? (
        <EmptyState
          title="Mulai dengan mencari pekerjaan"
          description="Isi kata kunci dulu. Kamu juga bisa pilih contoh cepat di bawah."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={()=>handleChip('Frontend Developer','Jakarta, Indonesia')} className="rounded-full border px-3 py-1 text-sm">Frontend • Jakarta</button>
              <button onClick={()=>handleChip('UI/UX Designer','Jakarta, Indonesia')} className="rounded-full border px-3 py-1 text-sm">UI/UX • Jakarta</button>
              <button onClick={()=>handleChip('Backend Node.js','Bandung, Indonesia')} className="rounded-full border px-3 py-1 text-sm">Backend • Bandung</button>
            </div>
          }
        />
      ) : status === 'loading' ? (
        <LoadingSkeleton rows={4} />
      ) : status === 'failed' ? (
        <ErrorState message={error} onRetry={handleSearch} />
      ) : !results?.length ? (
        <EmptyState title="Tidak ada hasil" description="Coba ubah kata kunci atau lokasi." />
      ) : (
        <div className="grid gap-3">
          {results.map(job => (
            <div key={job.externalId} className="rounded-xl border bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-zinc-600">{job.company} • {job.location || 'Lokasi tidak tersedia'}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>handleSave(job)} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
