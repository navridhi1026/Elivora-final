import React from 'react'
import { AlertCircle, CheckCircle } from 'react-feather'

export default function Alert({ heading, body, danger }) {
  return (
    <div className={`w-full flex items-start gap-3 p-4 rounded-lg border text-sm ${
      danger 
        ? 'bg-red-50 border-red-200 text-red-800' 
        : 'bg-green-50 border-green-200 text-green-800'
    }`}>
      {danger 
        ? <AlertCircle width={16} height={16} className="flex-shrink-0 mt-0.5" />
        : <CheckCircle width={16} height={16} className="flex-shrink-0 mt-0.5" />
      }
      <div>
        {heading && <p className="font-semibold">{heading}</p>}
        {body && <p className="mt-0.5 text-xs opacity-90">{body}</p>}
      </div>
    </div>
  )
}
