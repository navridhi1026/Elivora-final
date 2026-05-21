import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { ChevronRight, ArrowRight } from "react-feather"
import { categories, sliderItems } from '@/dummydata'

import Button from "@/components/Button"
import Container from "@/components/Container"
import CategoryList from "@/ui/CategoryList"
import ProductList from "@/ui/ProductList"
import Newsletter from "@/ui/Newsletter"
import Carousel from '../components/Carousel'
import api from '../api'
import { CartContext, UserContext } from "@/App"

export default function HomePage() {
  const {user} = useContext(UserContext)
  const {cartDispatch} = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const resp = await api.fetchProducts("", true)
      if (Array.isArray(resp)) setProducts(resp)
      else if (resp && resp.products) setProducts(resp.products)
      else setProducts([])
      setLoading(false)
    })()
  }, [])

  const addToCart = async (product, quantity=1) => {
    if (user) {
      const resp = await api.addProductsToCart([{productID: product._id, quantity}])
      if (resp.status === "ok") cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
    } else {
      cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
    }
  }
  
  return (
    <main>
      {/* Hero Carousel */}
      <section>
        <Carousel slides={sliderItems} />
      </section>

      {/* USP Bar */}
      <section className="bg-gray-900 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🚚", text: "Free Shipping ₹999+" },
            { icon: "↩️", text: "Easy 30-Day Returns" },
            { icon: "🔒", text: "Secure Payments" },
            { icon: "⭐", text: "10,000+ Happy Customers" },
          ].map(item => (
            <div key={item.text} className="flex items-center justify-center gap-2 text-sm font-medium">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <Container heading="Shop by Category">
        <CategoryList categories={categories} />
      </Container>

      {/* Men / Women banners */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/products?category=men" className="group relative overflow-hidden rounded-2xl h-72 block">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-1">Men's Collection</h3>
                <span className="text-white text-opacity-80 text-sm flex items-center gap-1">
                  Shop Now <ArrowRight width={14} height={14} />
                </span>
              </div>
            </Link>
            <Link to="/products?category=women" className="group relative overflow-hidden rounded-2xl h-72 block">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800"
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-1">Women's Collection</h3>
                <span className="text-white text-opacity-80 text-sm flex items-center gap-1">
                  Shop Now <ArrowRight width={14} height={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <Container heading="Latest Arrivals">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <ProductList products={[...products].slice(0, 8)} onAddToCart={addToCart} />
            <div className="flex justify-center mt-8">
              <Link to="/products">
                <Button className="text-sm px-8 py-3 rounded-full">
                  View All Products <ChevronRight width={15} height={15} className="ml-1" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-4">👕</p>
            <p className="text-lg font-medium mb-2">No products yet</p>
            <p className="text-sm">Make sure your API server is running at <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">localhost:5000</code></p>
            <p className="text-sm mt-1">Products will auto-load on first startup.</p>
          </div>
        )}
      </Container>

      {/* Try-On Feature */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🪞</div>
          <h2 className="text-3xl font-bold mb-4">AI Virtual Try-On</h2>
          <p className="text-gray-400 text-lg mb-3 max-w-xl mx-auto">
            Try on clothes virtually using your camera. AI detects your body pose and overlays outfits in real time.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            📸 Capture a photo → 🤖 AI detects your style → 👕 Get personalized recommendations
          </p>
          <Link to="/virtual-try-on">
            <Button light className="text-base px-8 py-3 rounded-full">
              Try It Now <ArrowRight width={16} height={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="my-16">
        <Newsletter />
      </section>
    </main>
  )
}
