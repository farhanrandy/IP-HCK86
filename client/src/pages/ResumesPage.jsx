import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResumes, removeResume } from '@/store/resumesSlice'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'

function extractSummary(r){
  try {
    const parsed = JSON.parse(r.contentText || '{}')
    if (parsed?.summary) return parsed.summary
  } catch {}
  return (r.contentText || '').slice(0, 140)
}

export default function ResumesPage(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status } = useSelector(s=>s.resumes)
  const [toDelete, setToDelete] = useState(null)

  useEffect(()=>{ dispatch(fetchResumes()) }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Resumes</h1>
        <Button className="bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700" onClick={()=>navigate('/resumes/new')}>New Resume</Button>
      </div>

      {status==='loading' && <div>Loading...</div>}
      {status==='succeeded' && items.length===0 && <EmptyState title="No resumes yet" subtitle="Create one to get started" />}

      {items.length>0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Summary</th>
                <th className="py-2 pr-4 w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(r=>(
                <tr key={r.id} className="border-b">
                  <td className="py-2 pr-4 font-medium">{r.title || 'Untitled'}</td>
                  <td className="py-2 pr-4 text-gray-600 line-clamp-2">{extractSummary(r)}</td>
                  <td className="py-2 pr-4 space-x-2">
                    <Link to={`/resumes/${r.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                    <button onClick={()=>setToDelete(r)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete Resume"
        message={`Delete "${toDelete?.title || 'Untitled'}"? This action cannot be undone.`}
        onCancel={()=>setToDelete(null)}
        onConfirm={async()=>{
          await dispatch(removeResume(toDelete.id))
          setToDelete(null)
        }}
      />
    </div>
  )
}
