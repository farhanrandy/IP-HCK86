export default function ErrorState({ message='Terjadi kesalahan', onRetry }){
  return (
    <div className="rounded-xl border bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-red-600">Error</h3>
      <p className="mt-1 text-sm text-zinc-700">{message}</p>
      {onRetry && <button onClick={onRetry} className="mt-4 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white">Coba lagi</button>}
    </div>
  )
}
