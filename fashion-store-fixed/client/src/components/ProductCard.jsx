import React from 'react'
import { Star, ShoppingCart } from 'react-feather'
import { Link } from 'react-router-dom'
import './ProductCard.css'

/**
 * Professional Product Card Component
 * Reusable across the app (products page, try-on suggestions, etc.)
 */
const ProductCard = ({
  id,
  image,
  title,
  price,
  rating = 4.5,
  reviews = 0,
  onAddToCart,
  featured = false,
  compact = false,
  onHover,
  discount = 0,
}) => {
  const discountedPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(0) : null

  return (
    <Link to={`/products/${id}`} className="product-card-container">
      <div 
        className={`product-card ${compact ? 'compact' : ''} ${featured ? 'featured' : ''}`}
        onMouseEnter={() => onHover?.(id)}
        onMouseLeave={() => onHover?.(null)}
      >
        {/* Image Section */}
        <div className="product-image-wrapper">
          <img
            src={image}
            alt={title}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/280x300?text=No+Image'
            }}
          />
          
          {discount > 0 && (
            <div className="discount-badge">-{discount}%</div>
          )}

          {featured && (
            <div className="featured-badge">✨ Featured</div>
          )}

          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.({ id, title, price, image })
            }}
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>

        {/* Info Section */}
        <div className="product-info">
          <h3 className="product-title">{title}</h3>

          {/* Rating */}
          {!compact && (
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill={i < Math.floor(rating) ? '#facc15' : 'none'}
                    color={i < Math.floor(rating) ? '#facc15' : '#666'}
                  />
                ))}
              </div>
              <span className="review-count">({reviews})</span>
            </div>
          )}

          {/* Price */}
          <div className="product-price">
            {discountedPrice ? (
              <>
                <span className="original-price">₹{price}</span>
                <span className="discounted-price">₹{discountedPrice}</span>
              </>
            ) : (
              <span className="price">₹{price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
