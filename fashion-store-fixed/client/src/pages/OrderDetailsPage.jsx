import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'react-feather'
import api from '../api'
import Container from '@/components/Container'
import Loader from '@/components/Loader'
import OrderTimeline from '@/components/OrderTimeline'

export default function OrderDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await api.fetchOrderDetails(id)

        if (resp.status === 'ok') {
          setOrder(resp.order)
        } else {
          setError('Order not found')
        }
      } catch (err) {
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <Loader />

  if (error) {
    return (
      <Container heading="Order Details" type="page">
        <p className="text-red-500 text-center py-12">{error}</p>
      </Container>
    )
  }

  // SAFE destructuring
  const {
    products = [],
    amount = 0,
    address = {},
    status,
    statusTimestamps = {},
    createdAt,
    _id
  } = order

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">

        {/* Back button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl p-6 mb-4 shadow">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-bold">Order Details</h1>
              <p className="text-gray-400 text-sm font-mono">
                #{_id.slice(-6).toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">₹{amount}</p>
              <p className="text-xs text-gray-400">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 mb-4 rounded-xl shadow">
          <h2 className="font-bold mb-4">Tracking</h2>
          <OrderTimeline status={status} statusTimestamps={statusTimestamps} />
        </div>

        {/* Products */}
        <div className="bg-white p-6 mb-4 rounded-xl shadow">
          <h2 className="font-bold mb-4">Items ({products.length})</h2>

          {products.map((item, i) => {
            const p = item.productID
            return (
              <div key={i} className="flex gap-4 items-center mb-3">
                <img
                  src={p?.image}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p>{p?.title}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p>₹{(p?.price || 0) * item.quantity}</p>
              </div>
            )
          })}

          <div className="flex justify-between mt-4 font-bold">
            <span>Total</span>
            <span>₹{amount}</span>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <MapPin size={16} /> Delivery Address
          </h2>

          <p>
            {typeof address === "string"
              ? address
              : `${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.zip || ''}`
            }
          </p>
        </div>

      </div>
    </main>
  )
}