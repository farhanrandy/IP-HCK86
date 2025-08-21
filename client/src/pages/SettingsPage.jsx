import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setDefaultResumeId } from '@/slices/settingsSlice'
import { useEffect } from 'react'
import { fetchResumes } from '@/slices/resumesSlice'

export default function SettingsPage(){
  const dispatch = useDispatch()
  const { language, defaultResumeId } = useSelector(s=>s.settings)
  const { list } = useSelector(s=>s.resumes)
  const { user } = useSelector(s=>s.auth)

  useEffect(()=>{ if (!list.length) dispatch(fetchResumes()) }, [dispatch])

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold">Settings</h3>

      <div className="mt-3">
        <label className="block text-sm">Bahasa default (cover letter)</label>
        <select className="w-full rounded-lg border px-3 py-2" value={language} onChange={e=>dispatch(setLanguage(e.target.value))}>
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="block text-sm">Default Resume</label>
        <select className="w-full rounded-lg border px-3 py-2" value={defaultResumeId || ''} onChange={e=>dispatch(setDefaultResumeId(e.target.value || null))}>
          <option value="">-- pilih --</option>
          {list.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
        </select>
      </div>

      <div className="mt-6 rounded-lg border bg-zinc-50 p-3 text-sm">
        <div><b>Nama:</b> {user?.name || '-'}</div>
        <div><b>Email:</b> {user?.email || '-'}</div>
      </div>
    </div>
  )
}
