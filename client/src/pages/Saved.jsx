import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSaved, removeSaved } from '../features/saved/savedSlice'

export default function Saved() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector(s=>s.saved)

  useEffect(()=>{ dispatch(fetchSaved()) }, [dispatch])

  return (
    <section>
      <h2 className="text-2xl font-semibold">Saved Jobs</h2>
      {status==='loading' && <p className="mt-4 text-gray-600">Loading…</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <div className="mt-6 space-y-4">
        {items.map((it)=>(
          <div key={it.id} className="border rounded-2xl p-4 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <b className="block">{it?.jobPayload?.title || '-'}</b>
                <span className="text-sm text-gray-600">{it?.jobPayload?.company || '-'}</span>
              </div>
              <button onClick={()=>dispatch(removeSaved(it.id))}
                      className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                Delete
              </button>
            </div>
            <p className="text-sm mt-3 whitespace-pre-wrap">
              {it?.jobPayload?.description?.slice(0, 400) || ''}
            </p>
          </div>
        ))}
        {items.length===0 && status==='succeeded' && <p>Empty.</p>}
      </div>
    </section>
  )
}
