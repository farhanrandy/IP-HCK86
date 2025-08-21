import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { generateCoverLetter, clearCover } from '../features/ai/aiSlice'

export default function AIHelper() {
  const dispatch = useDispatch()
  const { coverLetter, status, error } = useSelector(s=>s.ai)
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(generateCoverLetter({ resume_text: resumeText, job_description: jobDesc }))
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold">AI Resume Helper</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 mt-4 max-w-3xl">
        <textarea className="px-3 py-2 border rounded-xl" placeholder="Paste resume text..." rows={8} value={resumeText} onChange={e=>setResumeText(e.target.value)} />
        <textarea className="px-3 py-2 border rounded-xl" placeholder="Paste job description..." rows={8} value={jobDesc} onChange={e=>setJobDesc(e.target.value)} />
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">Generate Cover Letter</button>
          {status==='loading' && <span className="text-gray-600">Generating…</span>}
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </form>

      {coverLetter && (
        <div className="border rounded-2xl p-4 bg-white shadow-sm mt-6">
          <div className="flex items-center justify-between">
            <b>Result</b>
            <button onClick={()=>dispatch(clearCover())} className="px-3 py-2 rounded-lg border">Clear</button>
          </div>
          <pre className="whitespace-pre-wrap mt-3 text-sm">{coverLetter}</pre>
        </div>
      )}
    </section>
  )
}
