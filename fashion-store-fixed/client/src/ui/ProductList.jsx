import React, { useContext } from 'react'
import Product from "@/components/Product"
import { CartContext } from "@/App"

export default function ProductList({ products, onAddToCart }) {
  const {cart} = useContext(CartContext)

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">👕</p>
        <p className="text-lg font-medium">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <Product
          key={product._id}
          id={product._id}
          imgSrc={product.image}
          price={product.price}
          link={`/products/${product._id}`}
          onAddToCart={() => onAddToCart(product)}
          isInCart={cart.products.some(p => p.id === product._id)}
        />
      ))}
    </div>
  )
}
