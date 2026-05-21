import React from 'react'
import { Package, Truck, MapPin, CheckCircle } from 'react-feather'

const STEPS = [
  {
    key:   'processing',
    label: 'Processing',
    icon:  Package,
    description: 'Your order has been placed',
  },
  {
    key:   'shipped',
    label: 'Shipped',
    icon:  Truck,
    description: 'Your order is on its way',
  },
  {
    key:   'out_for_delivery',
    label: 'Out for Delivery',
    icon:  MapPin,
    description: 'Your order is nearby',
  },
  {
    key:   'delivered',
    label: 'Delivered',
    icon:  CheckCircle,
    description: 'Order delivered successfully',
  },
]

const STATUS_INDEX = {
  processing:       0,
  shipped:          1,
  out_for_delivery: 2,
  delivered:        3,
}

export default function OrderTimeline({ status, statusTimestamps }) {
  const currentIndex = STATUS_INDEX[status] ?? 0

  return (
    <div className="w-full py-6">
      <div className="flex items-start justify-between relative">

        {/* Connecting line behind the icons */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-black transition-all duration-700"
            style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent   = index === currentIndex
          const isPending   = index > currentIndex
          const Icon        = step.icon
          const timestamp   = statusTimestamps?.[step.key]

          return (
            <div key={step.key} className="flex flex-col items-center z-10 flex-1">

              {/* Circle icon */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-all duration-500
                  ${isCompleted ? 'bg-black border-black text-white' : ''}
                  ${isCurrent  ? 'bg-black border-black text-white ring-4 ring-gray-200' : ''}
                  ${isPending  ? 'bg-white border-gray-300 text-gray-400' : ''}
                `}
              >
                <Icon size={18} />
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-xs font-semibold text-center leading-tight
                  ${isPending ? 'text-gray-400' : 'text-black'}
                `}
              >
                {step.label}
              </p>

              {/* Timestamp */}
              {timestamp && (
                <p className="mt-1 text-xs text-gray-400 text-center">
                  {new Date(timestamp).toLocaleDateString('en-IN', {
                    day:   'numeric',
                    month: 'short',
                    hour:  '2-digit',
                    minute:'2-digit',
                  })}
                </p>
              )}

              {/* Current status badge */}
              {isCurrent && (
                <span className="mt-1 text-xs bg-black text-white px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}