import React, { useState } from 'react'
import api from '../api'

const STATUSES = [
  { value: 'processing',       label: 'Processing' },
  { value: 'shipped',          label: 'Shipped' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered',        label: 'Delivered' },
]

export default function AdminOrderStatus({ orderId, currentStatus, onUpdated }) {
  const [selected, setSelected] = useState(currentStatus)
  const [loading,  setLoading]  = useState(false)
  const [message,  setMessage]  = useState(null)

  const handleUpdate = async () => {
    if (selected === currentStatus) return
    setLoading(true)
    setMessage(null)
    try {
      const resp = await api.updateOrderStatus(orderId, selected)
      if (resp.status === 'ok') {
        setMessage({ type: 'success', text: 'Status updated successfully' })
        onUpdated?.(selected)
      } else {
        setMessage({ type: 'error', text: resp.message ?? 'Update failed' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
        Admin — Update Status
      </p>

      <div className="flex gap-3 flex-wrap">
        {STATUSES.map(s => (
          <button
            key={s.value}
            onClick={() => setSelected(s.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${selected === s.value
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-300 hover:border-black'}
            `}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading || selected === currentStatus}
        className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm
                   disabled:opacity-40 disabled:cursor-not-allowed
                   hover:bg-gray-800 transition-colors"
      >
        {loading ? 'Updating…' : 'Apply Update'}
      </button>

      {message && (
        <p className={`mt-3 text-sm font-medium
          ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}