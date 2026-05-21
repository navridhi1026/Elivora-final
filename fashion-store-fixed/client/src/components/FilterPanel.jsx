import React from 'react'

const FILTER_OPTIONS = {
  women: {
    types: ['top', 'bottom', 'dress', 'accessories', 'footwear'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '5', '6', '7', '8', '9', '10']
  },
  men: {
    types: ['shirt', 'tshirt', 'bottom', 'accessories', 'footwear'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '7', '8', '9', '10', '11', '12', '13']
  }
}

export default function FilterPanel({ category, filters, onFilterChange }) {
  const options = FILTER_OPTIONS[category] || { types: [], sizes: [] }

  const handleTypeChange = (type) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type]
    onFilterChange({ ...filters, types: newTypes })
  }

  const handleSizeChange = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size]
    onFilterChange({ ...filters, sizes: newSizes })
  }

  const hasActiveFilters = filters.types.length > 0 || filters.sizes.length > 0

  if (!category || (!options.types.length && !options.sizes.length)) return null

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => onFilterChange({ types: [], sizes: [] })}
            className="text-xs text-gray-500 hover:text-gray-900 underline"
          >
            Clear
          </button>
        )}
      </div>

      {options.types.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Type</h4>
          <div className="flex flex-wrap gap-1.5">
            {options.types.map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filters.types.includes(type)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {options.sizes.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Size</h4>
          <div className="flex flex-wrap gap-1.5">
            {options.sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`w-9 h-9 rounded-lg border text-xs font-medium transition-colors ${
                  filters.sizes.includes(size)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
