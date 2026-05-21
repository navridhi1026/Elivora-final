import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from "@/ui/RegisterForm"
import api from '@/api'

export default function RegisterPage() {
  const navigate = useNavigate()

  const handleRegister = async userData => {
    const resp = await api.registerUser(userData)
    if (resp.status === "ok") {
      navigate("/login")
    }
    return resp
  }

  return (
    <main className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/7973302/pexels-photo-7973302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=600"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-end p-12">
          <h2 className="text-white text-4xl font-black mb-3">Join Elivora</h2>
          <p className="text-white/80 text-lg">Create an account and discover your style.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link to="/" className="text-2xl font-black text-gray-900 tracking-tight block mb-10">
            ELIVORA
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-500 mb-8">Join thousands of fashion enthusiasts</p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </main>
  )
}
