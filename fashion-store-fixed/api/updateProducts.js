const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product.model')

dotenv.config()

// Update specific products by title
// Add the products you want to update here
const productsToUpdate = [
  {
    title: "Women's White T-Shirt",  // Product to find (must match exactly)
    updates: {
      image: "https://images.unsplash.com/photo-1633077705107-8f53a004218f?w=800",
      // Add any other fields you want to update:
      // price: 29.99,
      // description: "New description",
      // etc.
    }
  },
  // Add more products to update here:
  // {
  //   title: "Men's Casual T-Shirt",
  //   updates: {
  //     image: "https://images.unsplash.com/photo-NEW_ID?w=800",
  //     price: 34.99
  //   }
  // }
]

async function updateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log("Connected to database")

    let successCount = 0
    let notFoundCount = 0

    // Update each product
    for (const item of productsToUpdate) {
      const result = await Product.findOneAndUpdate(
        { title: item.title },
        { $set: item.updates },
        { new: true }
      )

      if (result) {
        console.log(`✅ Updated: ${item.title}`)
        successCount++
      } else {
        console.log(`❌ Not found: ${item.title}`)
        notFoundCount++
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`   - Successfully updated: ${successCount}`)
    console.log(`   - Not found: ${notFoundCount}`)

    mongoose.connection.close()
    console.log("\nDatabase connection closed")
  } catch (error) {
    console.error("Error updating products:", error)
    process.exit(1)
  }
}

updateProducts()
