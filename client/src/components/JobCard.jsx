
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function JobCard({ job, onSave, isSaved }){
  return (
    <div className="rounded-xl border p-4 bg-white flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
        </div>
        {isSaved && <Badge>Saved</Badge>}
      </div>
      {job.description && <p className="text-sm text-gray-700 line-clamp-4">{job.description}</p>}
      <div className="flex gap-2">
        <Button onClick={onSave} disabled={isSaved}>Save</Button>
        {job.applyUrl && <a className="text-sm underline self-center" href={job.applyUrl} target="_blank">Apply</a>}
      </div>
    </div>
  )
}
