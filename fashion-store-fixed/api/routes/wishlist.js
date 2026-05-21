const express = require('express')
const Wishlist = require('../models/Wishlist.model')
const Product = require('../models/Product.model')
const { verifyToken } = require('../middlewares/verifyAuth')

const router = express.Router()

// Get user wishlist
router.get('/', verifyToken, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userID: req.userId })
    
    if (!wishlist) {
      // Create empty wishlist if doesn't exist
      wishlist = await Wishlist.create({ userID: req.userId, products: [] })
    }

    // Populate product details
    const productIds = wishlist.products.map(p => p.productID)
    const products = await Product.find({ _id: { $in: productIds } })
    
    const wishlistWithDetails = wishlist.products.map(item => {
      const product = products.find(p => p._id.toString() === item.productID)
      return {
        ...product?._doc,
        id: product?._id,
        addedAt: item.addedAt
      }
    }).filter(p => p.id) // Filter out null products

    res.json({ status: "ok", products: wishlistWithDetails })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

// Add product to wishlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productID } = req.body

    if (!productID) {
      return res.status(400).json({ status: "error", message: "Product ID required" })
    }

    // Check if product exists
    const product = await Product.findById(productID)
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" })
    }

    let wishlist = await Wishlist.findOne({ userID: req.userId })

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userID: req.userId,
        products: [{ productID }]
      })
    } else {
      // Check if product already in wishlist
      const exists = wishlist.products.some(
  p => p.productID.toString() === productID
)
      
      if (exists) {
        return res.status(400).json({ status: "error", message: "Product already in wishlist" })
      }

      wishlist.products.push({ productID })
      await wishlist.save()
    }

    res.json({ status: "ok", message: "Product added to wishlist" })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

// Remove product from wishlist
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const { productId } = req.params

    const wishlist = await Wishlist.findOne({ userID: req.userId })

    if (!wishlist) {
      return res.status(404).json({ status: "error", message: "Wishlist not found" })
    }

    wishlist.products = wishlist.products.filter(
  p => p.productID.toString() !== productId
)
    await wishlist.save()

    res.json({ status: "ok", message: "Product removed from wishlist" })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

module.exports = router
