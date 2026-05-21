import React from 'react'
import clsx from "clsx"

export default function Button({ className, children, link, secondary, light, ...props}) {
  return (
    <button 
      className={clsx(
        "inline-flex items-center justify-center px-5 py-2.5 m-1",
        "text-sm font-semibold tracking-wide rounded-md",
        "transition-all duration-200 focus:outline-none",
        // Default dark button
        "bg-gray-900 text-white hover:bg-black",
        "hover:shadow-lg focus:ring-2 focus:ring-gray-400 focus:ring-offset-1",
        // Variants
        (secondary || link) && "!bg-transparent !shadow-none hover:!shadow-none",
        link && "!text-gray-800 hover:!text-gray-900 underline-offset-2",
        secondary && "!text-gray-800 !border !border-gray-300 hover:!bg-gray-100",
        light && "!bg-white !text-gray-900 hover:!bg-gray-100",
        props.disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
