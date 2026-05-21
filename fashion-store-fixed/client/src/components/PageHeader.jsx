import React from 'react'

export default function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1 text-sm">{subtitle}</p>}
      </div>
    </div>
  )
}
