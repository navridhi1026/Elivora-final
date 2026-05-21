import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "react-feather"
import Loader from '../components/Loader'

import Input from "@/components/Input"
import Button from "@/components/Button"
import Alert from "@/components/Alert"

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!email) errs.email = "Email is required"
    else if (!validateEmail(email)) errs.email = "Enter a valid email address"
    if (!password) errs.password = "Password is required"
    else if (password.length < 6) errs.password = "Password must be at least 6 characters"
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setApiError("")
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    const resp = await onSubmit({email, password})
    setLoading(false)
    if (resp.status === "error") {
      setApiError(resp.message)
    }
  }

  useEffect(() => {
    return () => { setLoading(false) }
  }, [])

  return (
    <form className="flex items-center flex-col space-y-3 w-full" onSubmit={handleSubmit}>
      <div className="w-full">
        <Input
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})) }}
          icon={<Mail width={16} height={16} />}
          type="email" placeholder="Email address"
          className={errors.email ? "border-red-400" : ""}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
      </div>

      <div className="w-full">
        <div className="relative">
          <Input
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})) }}
            icon={<Lock width={16} height={16} />}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={errors.password ? "border-red-400" : ""}
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
      </div>

      {apiError && <Alert heading="Login Failed" body={apiError} danger />}

      <Button className="w-full !mt-4 !text-sm !rounded-lg !mx-0" type="submit" disabled={loading}>
        {loading ? <Loader /> : "Sign In"}
      </Button>

      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="text-gray-900 font-semibold hover:underline">
          Create one
        </Link>
      </p>
    </form>
  )
}
