import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { ShoppingCart, Eye, Check, Heart } from "react-feather"
import clsx from "clsx"
import api from '../api'

export default function Product({ link, imgSrc, price, onAddToCart, isInCart, id }) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  useEffect(() => {
    const checkWishlist = async () => {
      if (!api.getUser() || !id) return
      try {
        const resp = await api.getWishlist()
        if (resp.status === "ok" && resp.products) {
          setIsInWishlist(resp.products.some(p => p.id === id))
        }
      } catch (err) {}
    }
    checkWishlist()
  }, [id])

  const handleWishlistToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!api.getUser()) { alert("Please login to add to wishlist"); return }
    setWishlistLoading(true)
    try {
      if (isInWishlist) {
        const resp = await api.removeFromWishlist(id)
        if (resp.status === "ok") setIsInWishlist(false)
      } else {
        const resp = await api.addToWishlist(id)
        if (resp.status === "ok") setIsInWishlist(true)
      }
    } catch (err) {}
    setWishlistLoading(false)
  }

  return (
    <div className={clsx(
      "group relative overflow-hidden bg-white rounded-xl border border-gray-100 cursor-pointer",
      "transition-all duration-300",
      "hover:shadow-xl hover:-translate-y-1"
    )}>
      {/* Image */}
      <div className="relative overflow-hidden h-64 bg-gray-100">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => {
            if (e.target.dataset.error) return
            e.target.dataset.error = true
            e.target.src = 'https://placehold.co/400x500/eeeeee/999999?text=No+Image'
          }}
        />

        {/* Hover overlay */}
        <div className={clsx(
          "absolute inset-0 bg-black bg-opacity-30",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          "flex items-center justify-center gap-3"
        )}>
          {isInCart ? (
            <Link to="/cart">
              <button className="w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg" title="View in cart">
                <Check width={18} height={18} />
              </button>
            </Link>
          ) : (
            <button onClick={onAddToCart}
              className="w-11 h-11 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors shadow-lg" title="Add to cart">
              <ShoppingCart width={18} height={18} />
            </button>
          )}
          <Link to={link}>
            <button className="w-11 h-11 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors shadow-lg" title="View details">
              <Eye width={18} height={18} />
            </button>
          </Link>
        </div>

        {/* Wishlist */}
        <button onClick={handleWishlistToggle} disabled={wishlistLoading}
          className={clsx(
            "absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md",
            "transition-all duration-200 hover:scale-110",
            wishlistLoading && "opacity-50"
          )}>
          <Heart className={clsx("w-4 h-4", isInWishlist ? "text-red-500 fill-current" : "text-gray-400")} />
        </button>
      </div>

      {/* Price bar */}
      <div className="p-3 flex items-center justify-between bg-white">
        <span className="font-bold text-gray-900 text-sm">₹{price}</span>
        {isInCart && <span className="text-xs text-green-600 font-semibold">✓ In Cart</span>}
      </div>
    </div>
  )
}
