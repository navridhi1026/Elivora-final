import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { User, Mail, Lock, Eye, EyeOff } from "react-feather"

import Input from "@/components/Input"
import Button from "@/components/Button"
import Alert from "@/components/Alert"
import Loader from '../components/Loader'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function RegisterForm({ onSubmit }) {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!fullname.trim()) errs.fullname = "Full name is required"
    else if (fullname.trim().length < 2) errs.fullname = "Name must be at least 2 characters"
    if (!email) errs.email = "Email is required"
    else if (!validateEmail(email)) errs.email = "Enter a valid email address"
    if (!password) errs.password = "Password is required"
    else if (password.length < 6) errs.password = "Password must be at least 6 characters"
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password"
    else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match"
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setApiError(null)
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    const resp = await onSubmit({fullname, email, password, confirmPassword})
    setLoading(false)
    if (resp.status === "error") {
      setApiError(resp.message)
    }
  }

  useEffect(() => {
    return () => { setLoading(false) }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col space-y-3 w-full">
      <div className="w-full">
        <Input
          value={fullname}
          icon={<User width={16} height={16} />}
          onChange={e => { setFullname(e.target.value); setErrors(p => ({...p, fullname: ""})) }}
          type="text" placeholder="Full Name"
          className={errors.fullname ? "border-red-400" : ""}
        />
        {errors.fullname && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullname}</p>}
      </div>

      <div className="w-full">
        <Input
          value={email}
          icon={<Mail width={16} height={16} />}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})) }}
          type="email" placeholder="Email address"
          className={errors.email ? "border-red-400" : ""}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
      </div>

      <div className="w-full">
        <div className="relative">
          <Input
            value={password}
            icon={<Lock width={16} height={16} />}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})) }}
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 6 characters)"
            className={errors.password ? "border-red-400" : ""}
          />
          <button type="button" onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
      </div>

      <div className="w-full">
        <Input
          value={confirmPassword}
          icon={<Lock width={16} height={16} />}
          onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword: ""})) }}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className={errors.confirmPassword ? "border-red-400" : ""}
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
      </div>
      
      {apiError && <Alert heading="Registration Failed" body={apiError} danger />}

      <Button className="w-full !mt-4 !text-sm !rounded-lg !mx-0" type="submit" disabled={loading}>
        {loading ? <Loader /> : "Create Account"}
      </Button>
      
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-gray-900 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
