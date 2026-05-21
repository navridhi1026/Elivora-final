import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Newsletter</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Stay in Style</h2>
        <p className="text-gray-500 mb-8">
          Get the latest arrivals, exclusive deals, and style inspiration straight to your inbox.
        </p>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-4 text-green-700 font-medium">
            ✓ You're subscribed! Watch your inbox for updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
