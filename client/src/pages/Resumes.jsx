import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { listResumes, createResume, updateResume, deleteResume } from '../features/resumes/resumesSlice'

export default function Resumes() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector(s=>s.resumes)
  const [title, setTitle] = useState('')
  const [contentText, setContentText] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(()=>{ dispatch(listResumes()) }, [dispatch])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if (editId) {
      dispatch(updateResume({ id: editId, title, contentText }))
        .then(()=>{ setEditId(null); setTitle(''); setContentText(''); })
    } else {
      dispatch(createResume({ title, contentText }))
        .then(()=>{ setTitle(''); setContentText(''); })
    }
  }

  const onEdit = (r)=>{
    setEditId(r.id); setTitle(r.title || ''); setContentText(r.contentText || '')
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold">Resumes</h2>
      {status==='loading' && <p className="mt-4 text-gray-600">Loading…</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-3 mt-4 max-w-2xl">
        <input className="px-3 py-2 border rounded-xl" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="px-3 py-2 border rounded-xl" placeholder="Content text" rows={8} value={contentText} onChange={e=>setContentText(e.target.value)} />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">{editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" onClick={()=>{setEditId(null); setTitle(''); setContentText('');}} className="px-4 py-2 rounded-xl border">Cancel</button>}
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {items.map(r=>(
          <div key={r.id} className="border rounded-2xl p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold">{r.title}</div>
              <div className="flex gap-2">
                <button onClick={()=>onEdit(r)} className="px-3 py-2 rounded-lg border">Edit</button>
                <button onClick={()=>dispatch(deleteResume(r.id))} className="px-3 py-2 rounded-lg bg-red-600 text-white">Delete</button>
              </div>
            </div>
            <pre className="whitespace-pre-wrap mt-3 text-sm">{r.contentText}</pre>
          </div>
        ))}
      </div>
    </section>
  )
}
