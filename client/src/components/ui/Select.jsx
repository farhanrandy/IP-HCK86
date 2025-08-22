import React from 'react'

const Select = React.forwardRef(function Select({ className='', children, ...props }, ref){
  return (
    <select
      ref={ref}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  )
})

export default Select
