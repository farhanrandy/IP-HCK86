import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'
import { fetchSavedJobs } from '@/slices/savedJobsSlice'
import { fetchResumes } from '@/slices/resumesSlice'
import { generateLetter, setContent } from '@/slices/letterSlice'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'
import DOMPurify from 'dompurify'

export default function SavedJobDetailPage(){
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const saved = useSelector(s=>s.saved)
  const resumes = useSelector(s=>s.resumes)
  const { language } = useSelector(s=>s.settings)
  const { content, status: letterStatus, error: letterError } = useSelector(s=>s.letter)
  const [resumeId, setResumeId] = useState('')
  const [lang, setLang] = useState(language || 'id')

  useEffect(()=>{
    if (!saved.list.length) dispatch(fetchSavedJobs())
    if (!resumes.list.length) dispatch(fetchResumes())
  }, [dispatch])

  const item = useMemo(()=> saved.list.find(j=> String(j.id) === String(id) ), [saved.list, id])
  const job = item?.jobPayload

  if (saved.status === 'loading' || resumes.status === 'loading') return <LoadingSkeleton rows={5} />
  if (saved.status === 'failed') return <ErrorState message={saved.error} onRetry={()=>dispatch(fetchSavedJobs())} />
  if (!item) return <ErrorState message="Data saved job tidak ditemukan" onRetry={()=>dispatch(fetchSavedJobs())} />

  const safeDesc = DOMPurify.sanitize(job?.description || '')

  const doGenerate = async ()=>{
    if (!resumeId) { alert('Pilih resume dulu'); return }
    try{
      await dispatch(generateLetter({ resumeId, jobExternalId: item.jobExternalId, language: lang })).unwrap()
      if (location.state?.focusGenerate) {
        setTimeout(()=>{
          const el = document.getElementById('letter-result')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }catch(e){}
  }

  const doPrint = ()=>{
    const w = window.open('', '_blank')
    w.document.write(`
      <html>
        <head>
          <title>Cover Letter</title>
          <style>
            @page { size: A4; margin: 18mm; }
            body { font: 14px/1.6 ui-sans-serif, system-ui, Arial; color: #111827; }
          </style>
        </head>
        <body>
          <h1 style="font-size:18px;margin:0 0 12px 0;">Cover Letter</h1>
          <div>${(content || '').replace(/</g,'<').replace(/>/g,'>')}</div>
          <script>window.onload = () => window.print()</script>
        </body>
      </html>
    `)
    w.document.close()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-xl border bg-white p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold">{job?.title}</h1>
            <p className="text-sm text-zinc-600">{job?.company} • {job?.location}</p>
          </div>
          {job?.applyUrl && (
            <a href={job.applyUrl} target="_blank" rel="noopener" className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white">Lamar via Situs</a>
          )}
        </div>
        <div className="mt-3 text-sm text-zinc-700">
          {job?.employmentType && <span className="mr-2 rounded border px-2 py-0.5">{job.employmentType}</span>}
          {job?.workMode && <span className="mr-2 rounded border px-2 py-0.5">{job.workMode}</span>}
        </div>
        <div className="prose mt-4 max-w-none prose-zinc" dangerouslySetInnerHTML={{ __html: safeDesc }} />
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Apply</h3>
        <label className="mt-2 block text-sm">Pilih Resume</label>
        <select className="w-full rounded-lg border px-3 py-2" value={resumeId} onChange={e=>setResumeId(e.target.value)}>
          <option value="">-- pilih --</option>
          {resumes.list.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>

        <label className="mt-3 block text-sm">Bahasa</label>
        <select className="w-full rounded-lg border px-3 py-2" value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>

        <p className="mt-2 text-xs text-zinc-500">Tone: <b>Formal</b> (fixed)</p>

        <button onClick={doGenerate} className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-2 text-white">Generate AI Cover Letter</button>

        {letterStatus === 'loading' && <p className="mt-2 text-sm text-zinc-600">Menghasilkan cover letter...</p>}
        {letterError && <p className="mt-2 text-sm text-red-600">{letterError}</p>}

        <div id="letter-result" className="mt-4">
          <label className="block text-sm">Hasil</label>
          <textarea className="mt-1 h-64 w-full rounded-lg border px-3 py-2 font-mono" value={content} onChange={e=>dispatch(setContent(e.target.value))} placeholder="Cover letter akan muncul di sini..." />
          <div className="mt-3 flex gap-2">
            <button onClick={()=>navigator.clipboard.writeText(content || '')} className="rounded-lg border px-3 py-1.5 text-sm">Copy</button>
            <button onClick={doPrint} className="rounded-lg border px-3 py-1.5 text-sm">Download PDF</button>
          </div>
        </div>
      </section>
    </div>
  )
}
