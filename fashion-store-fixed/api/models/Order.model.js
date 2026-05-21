const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },

  // 🔥 Order Tracking
  status: {
    type: String,
    enum: ['processing', 'shipped', 'out_for_delivery', 'delivered'],
    default: 'processing',
  },

  statusTimestamps: {
    processing: { type: Date, default: Date.now },
    shipped: { type: Date },
    out_for_delivery: { type: Date },
    delivered: { type: Date },
  },

  // 💳 Payment
  paymentId: { type: String },
  orderId: { type: String },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },

}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)