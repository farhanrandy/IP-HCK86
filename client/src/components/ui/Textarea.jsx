import React from 'react'

const Textarea = React.forwardRef(function Textarea({ className='', ...props }, ref){
  return (
    <textarea
      ref={ref}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  )
})

export default Textarea
