import React from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

/**
 * ProductGrid Component
 * Professional grid layout for displaying products
 * Responsive and handles loading/error states
 */
const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  onAddToCart,
  compact = false,
  columns = 4,
  emptyMessage = 'No products found',
}) => {
  if (error) {
    return (
      <div className="product-grid-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`product-grid product-grid-loading`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="product-skeleton">
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-price" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-icon">📦</div>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`product-grid ${compact ? 'compact' : ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          id={product._id || product.id}
          image={product.image}
          title={product.title || product.name}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
          onAddToCart={onAddToCart}
          compact={compact}
          discount={product.discount}
        />
      ))}
    </div>
  )
}

export default ProductGrid
