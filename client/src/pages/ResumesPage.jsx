import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResumes, createResume, deleteResume, updateResume } from '@/slices/resumesSlice'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'

export default function ResumesPage(){
  const dispatch = useDispatch()
  const { list, status, error } = useSelector(s=>s.resumes)
  const [title, setTitle] = useState('My Resume')
  const [contentText, setContentText] = useState('• Skill 1\n• Skill 2\n• Pengalaman singkat...')

  useEffect(()=>{ dispatch(fetchResumes()) }, [dispatch])

  const onCreate = async ()=>{
    if (!title.trim() || contentText.trim().length < 30) { alert('Lengkapi data'); return }
    await dispatch(createResume({ title, contentText }))
    setTitle('My Resume'); setContentText('• Skill 1\n• Skill 2\n• Pengalaman singkat...')
  }

  const onDelete = async (id)=>{
    if (!confirm('Hapus resume ini?')) return
    await dispatch(deleteResume(id))
  }

  const onQuickEdit = async (r)=>{
    const newTitle = prompt('Ubah judul:', r.title) || r.title
    const newContent = prompt('Ubah isi (singkat):', r.contentText) || r.contentText
    await dispatch(updateResume({ id: r.id, payload: { title: newTitle, contentText: newContent } }))
  }

  if (status === 'loading') return <LoadingSkeleton rows={4} />
  if (status === 'failed') return <ErrorState message={error} onRetry={()=>dispatch(fetchResumes())} />

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border bg-white p-4">
        <h3 className="font-semibold">Buat Resume</h3>
        <input className="mt-2 w-full rounded-lg border px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
        <textarea className="mt-2 h-40 w-full rounded-lg border px-3 py-2 font-mono" value={contentText} onChange={e=>setContentText(e.target.value)} />
        <button onClick={onCreate} className="mt-3 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white">Save</button>
      </div>
      <div className="space-y-3">
        {!list.length ? <EmptyState title="Belum ada resume" description="Buat resume terlebih dahulu." /> : list.map(r => (
          <div key={r.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="mt-1 whitespace-pre-wrap text-sm text-zinc-700">{r.contentText}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>onQuickEdit(r)} className="rounded-lg border px-3 py-1.5 text-sm">Edit</button>
                <button onClick={()=>onDelete(r.id)} className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
