import React, { useContext } from 'react'
import { sliderItems } from '@/dummydata'
import { UserContext, CartContext } from '@/App'
import LoginForm from "@/ui/LoginForm"
import api from '@/api'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const {cart} = useContext(CartContext)
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async userData => {
    const resp = await api.loginUser(userData)
    if (resp.status === "ok") {
      if (cart.products.length) {
        await api.addProductsToCart(cart.products.map(p => ({
          productID: p.id,
          quantity: p.quantity
        })))
      }
      setUser(api.getUser())
      navigate(cart.products.length ? "/cart" : "/account")
    }
    return resp
  }

  return (
    <main className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=600"
          alt="Fashion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-end p-12">
          <h2 className="text-white text-4xl font-black mb-3">Welcome Back</h2>
          <p className="text-white/80 text-lg">Sign in to access your orders, wishlist, and exclusive deals.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-black text-gray-900 tracking-tight block mb-10">
            ELIVORA
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
          <p className="text-gray-500 mb-8">Enter your credentials to continue</p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </div>
    </main>
  )
}
