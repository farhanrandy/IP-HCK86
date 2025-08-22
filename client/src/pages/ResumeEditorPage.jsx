import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResumeForm from '@/components/ResumeForm'
import * as resumes from '@/services/resumes'
import { useSelector, useDispatch } from 'react-redux'
import { fetchResumes } from '@/store/resumesSlice'
import toast from 'react-hot-toast'

function safeParse(jsonStr) {
  try { return JSON.parse(jsonStr) } catch { return null }
}

export default function ResumeEditorPage(){
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.resumes)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(()=>{
    (async ()=>{
      if (id) {
        if (!items?.length) {
          await dispatch(fetchResumes())
        }
        const found = (items || []).find(r => String(r.id) === String(id))
        if (found) {
          const parsed = safeParse(found.contentText)
          if (parsed) setData(parsed)
          else {
            setData({
              name: found.title || 'Untitled',
              summary: found.contentText || '',
              experiences: [], skills: [], education: []
            })
          }
        }
      }
    })()
  }, [id, items, dispatch])

  async function handleSubmit(values){
    try {
      setLoading(true)
      if (id) await resumes.update(id, values)
      else await resumes.create(values)
      toast.success('Saved')
      navigate('/resumes')
    } catch (e) {
      // handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{id ? 'Edit Resume' : 'New Resume'}</h1>
      {loading && <div>Loading...</div>}
      {!loading && <ResumeForm defaultValues={data} onSubmit={handleSubmit} submitLabel={id ? 'Update' : 'Create'} />}
    </div>
  )
}
