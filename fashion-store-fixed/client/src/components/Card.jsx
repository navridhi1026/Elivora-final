import React from 'react'
import clsx from "clsx"

export default function Card({ imgSrc, className, children }) {
  return (
    <div className={clsx(
      "relative group overflow-hidden bg-gray-100 rounded-xl product-card",
      "cursor-pointer",
      className
    )}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image' }}
        />
      )}
      {children}
    </div>
  )
}
