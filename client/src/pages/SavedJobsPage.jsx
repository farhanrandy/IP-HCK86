import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSavedJobs, deleteSavedJob } from '@/slices/savedJobsSlice'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { Link } from 'react-router-dom'

export default function SavedJobsPage(){
  const dispatch = useDispatch()
  const { list, status, error } = useSelector(s=>s.saved)

  useEffect(()=>{ dispatch(fetchSavedJobs()) }, [dispatch])

  if (status === 'loading') return <LoadingSkeleton rows={4} />
  if (status === 'failed') return <ErrorState message={error} onRetry={()=>dispatch(fetchSavedJobs())} />
  if (!list.length) return <EmptyState title="Belum ada lowongan tersimpan" description="Simpan dari halaman Jobs." />

  return (
    <div className="space-y-3">
      {list.map(item => (
        <div key={item.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
          <div>
            <div className="font-semibold">{item.jobPayload?.title}</div>
            <div className="text-sm text-zinc-600">{item.jobPayload?.company} • {item.jobPayload?.location}</div>
          </div>
          <div className="flex gap-2">
            <Link to={`/saved/${item.id}`} className="rounded-lg border px-3 py-1.5 text-sm">Open</Link>
            <Link to={`/saved/${item.id}`} state={{ focusGenerate: true }} className="rounded-lg border px-3 py-1.5 text-sm">Generate</Link>
            <button onClick={()=>dispatch(deleteSavedJob(item.id))} className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white">Unsave</button>
          </div>
        </div>
      ))}
    </div>
  )
}
