
export default function EmptyState({ title='Nothing here', subtitle='Try a different action' }){
  return (
    <div className="text-center py-12 border-2 border-dashed rounded-xl">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  )
}
