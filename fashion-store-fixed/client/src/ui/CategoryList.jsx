import React from 'react'
import { Link } from "react-router-dom"

export default function CategoryList({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map(category => (
        <Link
          key={category.id}
          to={`/products?category=${category.title.toLowerCase()}`}
          className="group relative overflow-hidden rounded-xl h-48 block transition-transform duration-300 hover:scale-102 shadow-sm hover:shadow-md"
        >
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-60 to-black to-opacity-10 group-hover:from-opacity-70 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-bold text-sm tracking-wider uppercase">{category.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
