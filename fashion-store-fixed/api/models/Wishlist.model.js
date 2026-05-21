const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userID: {
  type: mongoose.Schema.Types.ObjectId,  // ✅
  required: true,
  ref: 'User'
},
products: [{
  productID: {
    type: mongoose.Schema.Types.ObjectId, // ✅
    required: true,
    ref: 'Product'
  },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Wishlist', wishlistSchema)
