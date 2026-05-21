import React, { useState, useEffect } from 'react'
import api from '../api'
import Button from './Button'
import Input from './Input'
import Loader from "./Loader"
import { CheckCircle, ChevronRight, CreditCard, X, MapPin, User, Phone } from 'react-feather'
import { Link } from 'react-router-dom'

export default function CheckoutForm({onCancel,onSuccess}) {
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Success
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [orderDetails, setOrderDetails] = useState({})
  const [cartTotal, setCartTotal] = useState(0)
  
  // Address form fields
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  })

  useEffect(() => {
    // Get cart details
    (async () => {
      try {
        console.log("Loading cart for checkout...")
        const cart = await api.getUserCart()
        console.log("Cart received:", cart)
        
        if (cart && cart.status !== "error" && cart.products && cart.products.length > 0) {
          // Filter out any null or invalid products
          const validProducts = cart.products.filter(p => p && p.id)
          console.log("Valid products:", validProducts)
          const total = validProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
          setCartTotal(total)
          setOrderDetails({...cart, products: validProducts})
        } else {
          console.error("Cart is empty or error:", cart)
          setError("Your cart is empty")
        }
      } catch (err) {
        console.error("Error loading cart:", err)
        setError("Failed to load cart details")
      }
    })()
  }, [])

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    // Validate address
    if (!address.fullName || !address.phone || !address.street || !address.city || !address.state || !address.zip) {
      setError("Please fill all address fields")
      return
    }
    setError(null)
    setStep(2) // Move to payment step
  }

  const handleRazorpayPayment = async () => {
  try {
    setProcessing(true)

    const amount = cartTotal

    // 1. Create order
    const order = await api.createPaymentOrder(amount)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Fashion Store",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        try {
          // 2. Verify payment
          const verifyRes = await api.verifyPayment(response)

          if (verifyRes.success) {
            const products = orderDetails.products.filter(p => p && p.id)

            const fullAddress = `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} - ${address.zip}`

            // 3. Create order in DB
            const orderResp = await api.createOrder(
              products,
              cartTotal,
              fullAddress
            )

            if (orderResp.status === "ok") {
              await api.clearCart()
              setSucceeded(true)
              setStep(3)
              onSuccess()
            } else {
              setError("Order saving failed")
            }
          } else {
            setError("Payment verification failed")
          }
        } catch (err) {
          console.error(err)
          setError("Payment failed")
        } finally {
          setProcessing(false)
        }
      },

      prefill: {
        name: address.fullName,
        contact: address.phone,
      },

      theme: {
        color: "#000",
      },

      modal: {
        ondismiss: () => {
          setProcessing(false)
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  } catch (err) {
    console.error(err)
    setError("Payment failed")
    setProcessing(false)
  }
}

 

  // Step 1: Address Form
  if (step === 1) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2" /> Delivery Address
        </h3>
        <form onSubmit={handleAddressSubmit}>
          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) => setAddress({...address, fullName: e.target.value})}
              icon={<User />}
              required
            />
            <Input
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              icon={<Phone />}
              type="tel"
              required
            />
            <Input
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              icon={<MapPin />}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                required
              />
              <Input
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({...address, state: e.target.value})}
                required
              />
            </div>
            <Input
              placeholder="ZIP Code"
              value={address.zip}
              onChange={(e) => setAddress({...address, zip: e.target.value})}
              required
            />
          </div>

          {error && (
            <div className="text-red-400 mt-2 text-sm" role="alert">
              {error}
            </div>
          )}

          <Button className="w-full mt-6" type="submit">
            Continue to Payment <ChevronRight className="ml-2" />
          </Button>
          <Button className="w-full" secondary onClick={onCancel} type="button">Cancel</Button>
        </form>
      </div>
    )
  }

  // Step 2: Payment
  if (step === 2 && !succeeded) {
    return (
      <div>
        <section className='mb-6'>
          <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
          {cartTotal > 0 && 
            <div className='flex justify-between text-lg mt-2 mb-4'>
              <span className='font-semibold'>Total Amount:</span>
              <span className='font-bold text-xl'>₹{cartTotal}</span>
            </div>
          }
          {orderDetails?.products?.length ?
            <ul className="space-y-2 mb-4">
              {orderDetails.products.filter(product => product && product.id).map(product => (
                <CheckoutItem 
                  key={product.id}
                  title={product.title} 
                  price={product.price} 
                  quantity={product.quantity} 
                />
              ))}
            </ul>
            : <Loader color="bg-gray-600" />
          }

          {/* Delivery Address Display */}
          <div className="bg-gray-100 p-3 rounded mb-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" /> Delivery Address
            </h4>
            <p className="text-sm text-gray-700">
              {address.fullName}<br/>
              {address.phone}<br/>
              {address.street}<br/>
              {address.city}, {address.state} - {address.zip}
            </p>
            <button 
              onClick={() => setStep(1)} 
              className="text-blue-600 text-sm mt-2 underline"
              type="button"
            >
              Change Address
            </button>
          </div>
        </section>

        <form onSubmit={(e) => {
  e.preventDefault()
  handleRazorpayPayment()
}}>
          <div className="bg-gray-300 rounded p-4 mb-4">
            <p className="text-sm text-gray-600 mb-2">💳 Mock Payment (No real charges)</p>
            <p className="text-xs text-gray-500">Click "Complete Payment" to simulate successful payment</p>
          </div>
          
          {error && (
            <div className="text-red-400 mt-2" role="alert">
              {error}
            </div>
          )}

          <Button className="w-full mt-6" disabled={processing} type="submit">
            {processing 
              ? <Loader/>
              : <>
                <CreditCard className='mr-2 opacity-70' /> 
                <span>Complete Payment</span>
              </>
            }
          </Button>
          <Button className="w-full" secondary onClick={() => setStep(1)} type="button">
            Back to Address
          </Button>
        </form>
      </div>
    )
  }

  // Step 3: Success
  if (succeeded) {
    return (
      <div className='flex flex-col items-center'>
        <CheckCircle className='w-20 h-20 text-green-400' />
        <p className='text-lg font-light my-4'>Order Placed Successfully!</p>
        <p className='text-sm text-gray-600 mb-4 text-center'>
          Your order will be delivered to:<br/>
          <span className="font-semibold">{address.city}, {address.state}</span>
        </p>
        <Link to="/orders">
          <Button link>
            <span>Track Your Orders</span>
            <ChevronRight className='ml-2' />
          </Button>
        </Link>
        <Button secondary onClick={onCancel}>Close</Button>
      </div>
    )
  }
}

function CheckoutItem({title, price, quantity}) {
  return (
    <li className='flex justify-between text-sm'>
      <p className="flex-1">{title}</p>
      <div className='flex justify-between items-center'>
        {quantity > 1 &&
          <span className='inline-flex items-center text-gray-400 mr-3 text-xs'>
            <X className='w-3 h-3' />
            {quantity}
          </span>
        }
        <span className='font-medium'>₹{quantity*price}</span>
      </div>
    </li>
  )
}