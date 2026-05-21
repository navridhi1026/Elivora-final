import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import PageHeader from '../components/PageHeader'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Button from '../components/Button'
import { Heart, ShoppingBag } from 'react-feather'
import Alert from '../components/Alert'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = async () => {
    setLoading(true)
    const resp = await api.getWishlist()
    if (resp.status === "ok") {
      setWishlist(resp.products)
    }
    setLoading(false)
  }

  const handleRemoveFromWishlist = async (productId) => {
    const resp = await api.removeFromWishlist(productId)
    if (resp.status === "ok") {
      setWishlist(wishlist.filter(p => p.id !== productId))
      setAlert({ type: "success", message: "Removed from wishlist" })
      setTimeout(() => setAlert(null), 3000)
    } else {
      setAlert({ type: "error", message: "Failed to remove from wishlist" })
    }
  }

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <Loader color="bg-gray-600" />
      </main>
    )
  }

  if (wishlist.length === 0) {
    return (
      <main className="h-screen flex flex-col items-center text-center my-14 p-4">
        <PageHeader>Your Wishlist is Empty</PageHeader>
        <Heart className="w-20 h-20 text-gray-300 my-8" />
        <p className="text-gray-500 mb-8">Save items you love for later!</p>
        <Link to="/products">
          <Button link className="text-xl">
            <ShoppingBag className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </main>
    )
  }

  return (
    <main className="my-14">
      <PageHeader>My Wishlist</PageHeader>
      
      {alert && (
        <div className="max-w-6xl mx-auto px-4 mb-4">
          <Alert type={alert.type}>{alert.message}</Alert>
        </div>
      )}

      <section className="max-w-6xl mx-auto my-16 p-4">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="relative">
              <Product 
                id={product.id}
                link={`/products/${product.id}`}
                imgSrc={product.image}
                price={product.price}
                isInCart={false}
                onAddToCart={() => {}}
              />
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors z-10"
                title="Remove from wishlist"
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
