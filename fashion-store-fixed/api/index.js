const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const clothingRoutes = require('./routes/clothing')

const authRouter = require('./routes/auth') 
const userRouter = require('./routes/user') 
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart') 
const orderRouter = require('./routes/order')
const paymentRoutes = require("./routes/payment")
const checkoutRouter = require('./routes/checkout')
const wishlistRouter = require('./routes/wishlist')
const { handleMalformedJson, formatCelebrateErrors } = require('./middlewares/handleError')
const Product = require('./models/Product.model')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(async () => {
  console.log("Connected to database")
  // Auto-seed if empty
  const count = await Product.countDocuments()
  if (count === 0) {
    console.log("Database empty - seeding products...")
    require('./seedProducts')
  } else {
    console.log(`Database has ${count} products`)
  }
}).catch(err => console.error(err))

app.use(cors())
app.use(express.json())
app.use(handleMalformedJson)
app.use("/api/payment", paymentRoutes)
app.use('/clothes', express.static(path.join(__dirname, 'public/clothes')))

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/orders", orderRouter)
app.use("/checkout", checkoutRouter)
app.use("/wishlist", wishlistRouter)
app.use('/clothing', clothingRoutes)

// Add gender-based product suggestion route
app.get("/suggestions", async (req, res) => {
  try {
    const { gender } = req.query
    const category = gender === 'female' ? 'women' : 'men'
    const products = await Product.find({ categories: { $in: [category] } }).limit(6)
    res.json({ status: "ok", products, category })
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message })
  }
})

app.get("/", (req, res) => {
  res.json({status: "ok"})
})

app.use(formatCelebrateErrors)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
