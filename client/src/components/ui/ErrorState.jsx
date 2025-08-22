
export default function ErrorState({ message='Something went wrong' }){
  return (
    <div className="text-center py-12 border border-red-200 rounded-xl bg-red-50 text-red-700">
      {message}
    </div>
  )
}
