import React from 'react'

const Input = React.forwardRef(function Input({ className='', ...props }, ref){
  return (
    <input
      ref={ref}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  )
})

export default Input
