import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs, setQuery, setLocation } from '../features/jobs/jobsSlice'
import { saveJob } from '../features/saved/savedSlice'
import { useEffect } from 'react'
import JobCard from '../components/JobCard'

export default function Jobs() {
  const dispatch = useDispatch()
  const { list, status, error, q, location } = useSelector(s=>s.jobs)

  // Hindari fetch otomatis ketika q kosong yang menyebabkan 400 dari backend
  useEffect(()=>{
    if (list.length === 0 && q.trim()) {
      dispatch(fetchJobs({ q, location, page: 1 }))
    }
  }, []) // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(fetchJobs({ q, location, page: 1 }))
  }

  const handleSave = (job) => {
    const jobExternalId = job.job_id || job.id || job.jobId || job.link || job.url || (job.title+job.company)
    const payload = { 
      jobExternalId: String(jobExternalId),
      source: 'google',
      jobPayload: job
    }
    dispatch(saveJob(payload))
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold">Job Search</h2>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-4">
        <input
          placeholder="keyword (e.g. frontend)"
          value={q} onChange={e=>dispatch(setQuery(e.target.value))}
          className="flex-1 px-3 py-2 border rounded-xl"
        />
        <input
          placeholder="location (optional)"
          value={location} onChange={e=>dispatch(setLocation(e.target.value))}
          className="flex-1 px-3 py-2 border rounded-xl"
        />
        <button type="submit" className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">
          Search
        </button>
      </form>

      {status==='loading' && <p className="mt-6 text-gray-600">Loading…</p>}
      {status==='failed' && <p className="mt-6 text-red-600">{error}</p>}

      <div className="mt-6">
        {list.map((job, idx)=>(
          <JobCard key={idx} job={job} onSave={()=>handleSave(job)} />
        ))}
        {list.length===0 && status==='succeeded' && <p>No jobs found.</p>}
      </div>
    </section>
  )
}
