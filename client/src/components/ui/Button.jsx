
export default function Button({ children, className='', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
