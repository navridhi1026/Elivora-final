import React from 'react'
import clsx from "clsx"

export default function Container({ heading, children, type }) {
  return (
    <div className={clsx(
      "max-w-6xl mx-auto px-4 py-12",
      type === "page" && "min-h-screen"
    )}>
      {heading && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{heading}</h2>
          <div className="w-12 h-0.5 bg-gray-900 mt-2"></div>
        </div>
      )}
      {children}
    </div>
  )
}
