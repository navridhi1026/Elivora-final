import React from 'react'
import clsx from "clsx"

export default function Input({ className, icon, ...props }) {
  return (
    <div className={clsx(
      "flex items-center w-full",
      "border border-gray-300 rounded-lg",
      "bg-white px-3 py-2",
      "focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900",
      "transition-all duration-200",
      className
    )}>
      {icon && <span className="mr-2 text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm"
        {...props}
      />
    </div>
  )
}
