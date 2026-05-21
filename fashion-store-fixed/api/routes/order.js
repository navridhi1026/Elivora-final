const router = require('express').Router()
const Order  = require('../models/Order.model')

const {
  verifyToken,
  verifyAuthorization,
  verifyAdminAccess,
} = require('../middlewares/verifyAuth')

const VALID_STATUSES = ['processing', 'shipped', 'out_for_delivery', 'delivered']

// ✅ CREATE ORDER
router.post('/', verifyToken, async (req, res) => {
  try {
    const { products, amount, address } = req.body
    const userID = req.user.uid   // 🔥 FIX

    const order = await Order.create({
      userID,
      products,
      amount,
      address,
      status: 'processing',
      statusTimestamps: { processing: new Date() },
      paymentStatus: 'paid'
    })

    simulateOrderProgression(order._id)

    return res.status(201).json({ status: 'ok', order })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ status: 'error', message: err.message })
  }
})

// ✅ GET USER ORDERS
router.get('/user/:userId', verifyAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userID: req.params.userId })
      .populate('products.productID', 'title image price')
      .sort({ createdAt: -1 })

    return res.json({ status: 'ok', orders })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
})

// ✅ GET SINGLE ORDER
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('products.productID')

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' })
    }

    return res.json({ status: 'ok', order })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
})

// ✅ UPDATE STATUS (ADMIN)
router.patch('/:orderId/status', verifyAdminAccess, async (req, res) => {
  try {
    const { status } = req.body

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status' })
    }

    const update = {
      status,
      [`statusTimestamps.${status}`]: new Date(),
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: update },
      { new: true }
    )

    return res.json({ status: 'ok', order })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
})

// ✅ DELETE ORDER
router.delete('/:orderId', verifyAdminAccess, async (req, res) => {
  await Order.findByIdAndDelete(req.params.orderId)
  res.json({ status: 'ok' })
})

// 🔥 AUTO STATUS CHANGE
function simulateOrderProgression(orderId) {
  const steps = [
    { status: 'shipped', delay: 10000 },
    { status: 'out_for_delivery', delay: 20000 },
    { status: 'delivered', delay: 30000 },
  ]

  steps.forEach(({ status, delay }) => {
    setTimeout(async () => {
      await Order.findByIdAndUpdate(orderId, {
        $set: {
          status,
          [`statusTimestamps.${status}`]: new Date(),
        },
      })
      console.log(`Order ${orderId} → ${status}`)
    }, delay)
  })
}

module.exports = router