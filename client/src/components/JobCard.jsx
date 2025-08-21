export default function JobCard({ job, onSave }) {
  const title = job.title || job.job_title || job.position || 'Untitled'
  const company = job.company || job.company_name || job.employer || '-'
  const location = job.location || job.city || job.job_location || '-'
  const desc = job.description || job.job_description || job.snippet || ''

  const applyUrl = job.apply_link || job.apply_url || job.url || job.link

  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow transition mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{company} • {location}</p>
        </div>
        {applyUrl && (
          <a href={applyUrl} target="_blank" rel="noreferrer"
             className="text-sm underline text-gray-700 hover:text-black">
            Open
          </a>
        )}
      </div>
      <p className="text-sm mt-3 whitespace-pre-wrap">
        {desc?.slice(0, 400)}{desc?.length > 400 ? '…' : ''}
      </p>
      {onSave && (
        <div className="mt-3">
          <button onClick={onSave}
                  className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-black">
            Save
          </button>
        </div>
      )}
    </div>
  )
}
