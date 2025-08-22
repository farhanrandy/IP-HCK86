
export default function LoadingSkeleton(){
  return (
    <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({length: 6}).map((_,i)=>(
        <div key={i} className="rounded-xl border p-4">
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-20 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  )
}
