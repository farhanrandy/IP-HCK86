
import { useState } from 'react'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { jsPDF } from 'jspdf'
import toast from 'react-hot-toast'

export default function SavedJobItem({ job, resumes, onChangeResume, onDelete, onGenerate }){
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  async function handleGenerate(){
    const resText = await onGenerate(job)
    setText(resText || '')
    setOpen(true)
  }

  function handleCopy(){
    navigator.clipboard.writeText(text || '').then(()=> toast.success('Copied'))
  }

  function handleDownload(){
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 40
    doc.setFontSize(14)
    doc.text(`Cover Letter`, margin, margin)
    doc.setFontSize(10)
    doc.text(new Date().toLocaleDateString(), 520, margin, { align: 'right' })
    doc.setFontSize(12)
    const body = doc.splitTextToSize(text || '', 520)
    doc.text(body, margin, margin+30)
    const safeCompany = (job.company || 'Company').replace(/[^a-z0-9_\-]+/gi,'_')
    const safeRole = (job.title || 'Role').replace(/[^a-z0-9_\-]+/gi,'_')
    const safeResume = (resumes.find(r=>r.id===job.selectedResumeId)?.name || 'Resume').replace(/[^a-z0-9_\-]+/gi,'_')
    doc.save(`Cover_Letter_${safeCompany}_${safeRole}_${safeResume}.pdf`)
  }

  return (
    <div className="rounded-xl border p-4 bg-white space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
        </div>
        <button onClick={()=>onDelete(job)} className="text-sm text-red-600 hover:underline">Remove</button>
      </div>
      {job.description && <p className="text-sm text-gray-700 line-clamp-4">{job.description}</p>}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="sm:w-72">
          <Select
            value={job.selectedResumeId || ''}
            onChange={(e)=> onChangeResume(job, Number(e.target.value) || null)}
          >
            <option value="">Choose Resume</option>
            {resumes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </Select>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerate} disabled={!job.selectedResumeId}>Generate Cover Letter</Button>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Cover Letter Preview" footer={(
        <>
          <button onClick={handleCopy} className="rounded-lg border px-3 py-2 text-sm">Copy</button>
          <button onClick={handleDownload} className="rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm">Download PDF</button>
        </>
      )}>
        <pre className="whitespace-pre-wrap text-sm leading-6">{text}</pre>
      </Modal>
    </div>
  )
}
