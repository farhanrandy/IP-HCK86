import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import JobCard from '@/components/JobCard'
import { setQuery, setLocation, fetchJobs, saveJobThunk } from '@/store/jobsSlice'

export default function JobsPage(){
  const dispatch = useDispatch()
  const { q, location, results, status, savedExternalIds } = useSelector(s => s.jobs)

  useEffect(()=>{
    if (!results?.length) {
      // jangan auto-search default; biarkan user klik Search jika mau
    }
  }, [])

  const onSearch = (e)=>{
    e.preventDefault()
    dispatch(fetchJobs({ q, location }))
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2">
        <Input placeholder="Search jobs..." value={q} onChange={e=>dispatch(setQuery(e.target.value))} />
        <Input placeholder="Location" value={location} onChange={e=>dispatch(setLocation(e.target.value))} />
        <Button type="submit">Search</Button>
      </form>

      {status === 'loading' && <LoadingSkeleton />}
      {status === 'succeeded' && results?.length === 0 && <EmptyState title="No jobs" subtitle="Try another query" />}
      {status === 'succeeded' && results?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((job, idx)=>{
            const externalId = job.externalId || job.jobExternalId || job.id || idx
            const isSaved = !!savedExternalIds[externalId]
            return (
              <JobCard
                key={externalId}
                job={job}
                isSaved={isSaved}
                onSave={()=> dispatch(saveJobThunk({ jobExternalId: externalId, source: job.source || 'google', jobPayload: job }))}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
