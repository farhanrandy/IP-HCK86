import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResumes } from '@/store/resumesSlice'
import { fetchSavedJobs, deleteSavedJob } from '@/store/savedJobsSlice'
import * as saved from '@/services/savedJobs'
import { getSelected, setSelected } from '@/services/selectedResumeStore'
import SavedJobItem from '@/components/SavedJobItem'
import EmptyState from '@/components/ui/EmptyState'

function normalizeResume(r){
  if (!r) return null
  if (r.experiences || r.skills || r.education) return r
  try {
    const parsed = typeof r.contentText === 'string' ? JSON.parse(r.contentText) : null
    if (parsed) return parsed
  } catch {}
  return { name: r.title || 'Untitled', summary: r.contentText || '', experiences: [], skills: [], education: [] }
}

function buildResumePlainText(r){
  if (!r) return ''
  const exp = (r.experiences||[]).map(e=>`${e.role} @ ${e.company} (${e.startDate}–${e.endDate}) — ${e.description}`).join('\n')
  const skills = (r.skills||[]).join(', ')
  const edu = (r.education||[]).map(e=>`${e.degree}, ${e.school} ${e.year}`).join('\n')
  return `${r.name}\n\nSummary:\n${r.summary}\n\nExperience:\n${exp}\n\nSkills:\n${skills}\n\nEducation:\n${edu}`
}

export default function SavedJobsPage(){
  const dispatch = useDispatch()
  const { items } = useSelector(s=>s.saved)
  const resumes = useSelector(s=>s.resumes.items)
  const [selectedMap, setSelectedMap] = useState({})

  useEffect(()=>{
    dispatch(fetchResumes())
    dispatch(fetchSavedJobs())
  }, [])

  // hydrate selected from localStorage when items arrive
  useEffect(()=>{
    const map = {}
    for (const j of items || []) {
      const sel = getSelected(j.id)
      if (sel) map[j.id] = sel
    }
    setSelectedMap(map)
  }, [items])

  const computed = useMemo(()=>{
    return (items || []).map(j => ({ ...j, selectedResumeId: selectedMap[j.id] || null }))
  }, [items, selectedMap])

  async function onChangeResume(job, selectedResumeId){
    setSelected(job.id, selectedResumeId || null)
    setSelectedMap(prev => ({ ...prev, [job.id]: selectedResumeId || null }))
  }

  async function onDelete(job){
    await dispatch(deleteSavedJob(job.id))
  }

  async function onGenerate(job){
    const resume = normalizeResume(resumes.find(r => r.id === (selectedMap[job.id] || job.selectedResumeId)))
    const resume_text = buildResumePlainText(resume)
    const job_description = job.description || job.jobPayload?.description || job.title || ''
    const out = await saved.generateCoverLetter({ resume_text, job_description, tone: 'profesional', lang: 'id' })
    return out?.cover_letter || out?.text || ''
  }

  if (!computed?.length) return <EmptyState title="No saved jobs yet" subtitle="Save jobs from the Jobs page" />

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Saved Jobs</h1>
      <div className="space-y-3">
        {computed.map(job => (
          <SavedJobItem
            key={job.id}
            job={job}
            resumes={resumes}
            onChangeResume={onChangeResume}
            onDelete={onDelete}
            onGenerate={onGenerate}
          />
        ))}
      </div>
    </div>
  )
}
