export default function EmptyState({ title='Tidak ada data', description='Silakan coba lagi', action=null }){
  return (
    <div className="rounded-xl border bg-white p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
