const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product.model')

dotenv.config()

const sampleProducts = [
  // ── WOMEN - DRESSES ─────────────────────────────────────────
  { title: "Floral Sundress", description: "Beautiful floral sundress perfect for summer outings.", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800", price: 1499, inStock: true, categories: ["women", "dress"], size: ["S","M","L","XL"], color: ["Floral"] },
  { title: "Women's Black Dress", description: "Elegant black dress for formal and casual occasions.", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800", price: 2799, inStock: true, categories: ["women", "dress"], size: ["XS","S","M","L"], color: ["Black"] },
  { title: "Women's Maxi Dress", description: "Elegant maxi dress for special occasions.", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800", price: 3299, inStock: true, categories: ["women", "dress"], size: ["S","M","L","XL"], color: ["Navy","Red"] },
  { title: "Bodycon Mini Dress", description: "Sleek and sexy mini dress for night outs.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", price: 1899, inStock: true, categories: ["women", "dress"], size: ["XS","S","M","L"], color: ["Black","Red"] },
  { title: "A-Line Party Dress", description: "Graceful A-line dress perfect for parties and events.", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800", price: 2499, inStock: true, categories: ["women", "dress"], size: ["S","M","L","XL"], color: ["Purple","Pink"] },
  { title: "Casual Wrap Dress", description: "Versatile wrap dress for everyday sophistication.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800", price: 1699, inStock: true, categories: ["women", "dress"], size: ["S","M","L","XL"], color: ["Cream","Brown"] },
  
  // ── WOMEN - TOPS ────────────────────────────────────────────
  { title: "Women's White Tee", description: "Classic white cotton t-shirt, wardrobe essential.", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800", price: 799, inStock: true, categories: ["women", "top"], size: ["XS","S","M","L","XL"], color: ["White"] },
  { title: "Women's Summer Blouse", description: "Light and airy blouse perfect for warm weather.", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800", price: 1199, inStock: true, categories: ["women", "top"], size: ["S","M","L","XL"], color: ["White","Cream"] },
  { title: "Women's Crop Top", description: "Stylish crop top for casual outings.", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800", price: 899, inStock: true, categories: ["women", "top"], size: ["XS","S","M","L"], color: ["White","Pink","Black"] },
  { title: "Women's Hoodie", description: "Comfortable oversized hoodie for chilly days.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", price: 1799, inStock: true, categories: ["women", "top"], size: ["S","M","L","XL"], color: ["Gray","Black"] },
  { title: "Women's Denim Jacket", description: "Trendy denim jacket pairs well with any outfit.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", price: 2499, inStock: true, categories: ["women", "top"], size: ["S","M","L","XL"], color: ["Blue"] },
  { title: "Satin Camisole", description: "Elegant satin camisole for layering.", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800", price: 1099, inStock: true, categories: ["women", "top"], size: ["S","M","L","XL"], color: ["Black","Gold"] },
  { title: "Striped Off-Shoulder Top", description: "Trendy off-shoulder top with classic stripes.", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800", price: 1299, inStock: true, categories: ["women", "top"], size: ["S","M","L","XL"], color: ["White-Black"] },
  
  // ── WOMEN - BOTTOMS ─────────────────────────────────────────
  { title: "Women's Skinny Jeans", description: "Comfortable skinny jeans with modern fit.", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800", price: 1899, inStock: true, categories: ["women", "bottom"], size: ["26","28","30","32"], color: ["Blue","Black"] },
  { title: "Women's Palazzo Pants", description: "Comfortable palazzo pants for casual wear.", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800", price: 1349, inStock: true, categories: ["women", "bottom"], size: ["S","M","L","XL"], color: ["Black","Navy"] },
  { title: "Women's Leggings", description: "Stretchable high-waist leggings for gym or casual.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800", price: 999, inStock: true, categories: ["women", "bottom"], size: ["XS","S","M","L","XL"], color: ["Black","Gray"] },
  { title: "Cargo Pants Women", description: "Trendy cargo pants with utility pockets.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", price: 1599, inStock: true, categories: ["women", "bottom"], size: ["S","M","L","XL"], color: ["Olive","Khaki","Black"] },
  { title: "Flare Jeans", description: "Retro flare jeans for a timeless look.", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800", price: 2099, inStock: true, categories: ["women", "bottom"], size: ["26","28","30","32"], color: ["Blue","Black"] },
  { title: "Women's Shorts", description: "Comfortable denim shorts for summer.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", price: 1099, inStock: true, categories: ["women", "bottom"], size: ["S","M","L","XL"], color: ["Blue","Denim"] },
  
  // ── WOMEN - ACCESSORIES ─────────────────────────────────────
  { title: "Women's Leather Handbag", description: "Premium leather handbag for everyday use.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800", price: 3999, inStock: true, categories: ["women", "accessories"], size: ["OneSize"], color: ["Black","Brown","Tan"] },
  { title: "Silk Scarf", description: "Luxurious silk scarf for styling.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800", price: 899, inStock: true, categories: ["women", "accessories"], size: ["OneSize"], color: ["Red","Blue","Gold"] },
  { title: "Statement Necklace", description: "Bold statement necklace to elevate any outfit.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800", price: 1499, inStock: true, categories: ["women", "accessories"], size: ["OneSize"], color: ["Gold","Silver"] },
  { title: "Leather Belt", description: "Classic leather belt for jeans and pants.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", price: 899, inStock: true, categories: ["women", "accessories"], size: ["S","M","L","XL"], color: ["Black","Brown"] },
  { title: "Crossbody Bag", description: "Stylish crossbody bag for all occasions.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", price: 2299, inStock: true, categories: ["women", "accessories"], size: ["OneSize"], color: ["Black","White"] },
  
  // ── MEN - SHIRTS ────────────────────────────────────────────
  { title: "Men's Classic White Shirt", description: "Crisp white dress shirt for formal occasions.", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800", price: 1649, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL","XXL"], color: ["White"] },
  { title: "Men's Linen Shirt", description: "Breathable linen shirt ideal for summer.", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800", price: 1449, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL"], color: ["White","Light Blue","Beige"] },
  { title: "Men's Casual Blazer", description: "Smart casual blazer for business or evening wear.", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", price: 3499, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL"], color: ["Navy","Gray"] },
  { title: "Men's Denim Jacket", description: "Classic denim jacket, a wardrobe staple.", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800", price: 2799, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL"], color: ["Blue","Light Blue"] },
  { title: "Men's Oxford Shirt", description: "Timeless oxford button-down shirt.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800", price: 1799, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL","XXL"], color: ["Blue","White","Pink"] },
  { title: "Men's Flannel Shirt", description: "Cozy flannel shirt for outdoor adventures.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", price: 1399, inStock: true, categories: ["men", "shirt"], size: ["S","M","L","XL","XXL"], color: ["Red","Blue","Green"] },
  
  // ── MEN - T-SHIRTS & HOODIES ────────────────────────────────
  { title: "Men's Black T-Shirt", description: "Essential black t-shirt, perfect base for any outfit.", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800", price: 699, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["Black"] },
  { title: "Men's Polo Shirt", description: "Classic polo shirt with comfortable collar.", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800", price: 1199, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["Navy","White","Red"] },
  { title: "Men's Hoodie Sweatshirt", description: "Cozy hoodie perfect for casual and outdoor wear.", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800", price: 1899, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["Gray","Black","Navy"] },
  { title: "Men's Graphic Tee", description: "Cool graphic tee for casual streetwear look.", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800", price: 799, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["White","Black"] },
  { title: "V-Neck T-Shirt", description: "Classic V-neck tee for smart casual look.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800", price: 849, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["Black","Gray","Navy"] },
  { title: "Henley Shirt", description: "Stylish henley with button placket.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", price: 999, inStock: true, categories: ["men", "tshirt"], size: ["S","M","L","XL","XXL"], color: ["White","Black","Navy"] },
  
  // ── MEN - BOTTOMS ──────────────────────────────────────────
  { title: "Men's Blue Denim Jeans", description: "Classic blue denim jeans with comfortable fit.", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800", price: 2099, inStock: true, categories: ["men", "bottom"], size: ["30","32","34","36","38"], color: ["Blue","Dark Blue"] },
  { title: "Men's Formal Trousers", description: "Tailored formal trousers for office and events.", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800", price: 2299, inStock: true, categories: ["men", "bottom"], size: ["30","32","34","36","38"], color: ["Black","Gray","Navy"] },
  { title: "Men's Slim Fit Chinos", description: "Versatile slim fit chinos for any occasion.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800", price: 1799, inStock: true, categories: ["men", "bottom"], size: ["30","32","34","36"], color: ["Beige","Olive","Navy"] },
  { title: "Men's Cargo Pants", description: "Rugged cargo pants with multiple pockets.", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800", price: 1999, inStock: true, categories: ["men", "bottom"], size: ["30","32","34","36","38"], color: ["Olive","Khaki","Black"] },
  { title: "Men's Shorts", description: "Comfortable athletic shorts for summer.", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800", price: 1299, inStock: true, categories: ["men", "bottom"], size: ["S","M","L","XL","XXL"], color: ["Black","Navy","Gray"] },
  { title: "Joggers", description: "Casual joggers for comfort and style.", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800", price: 1599, inStock: true, categories: ["men", "bottom"], size: ["S","M","L","XL","XXL"], color: ["Black","Gray","Navy"] },
  
  // ── MEN - ACCESSORIES ───────────────────────────────────────
  { title: "Men's Leather Wallet", description: "Premium leather wallet for essentials.", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800", price: 1499, inStock: true, categories: ["men", "accessories"], size: ["OneSize"], color: ["Black","Brown"] },
  { title: "Men's Leather Belt", description: "Classic leather belt perfect with any outfit.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800", price: 999, inStock: true, categories: ["men", "accessories"], size: ["S","M","L","XL"], color: ["Black","Brown","Tan"] },
  { title: "Baseball Cap", description: "Classic baseball cap for casual style.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", price: 699, inStock: true, categories: ["men", "accessories"], size: ["OneSize"], color: ["Black","Navy","Gray"] },
  { title: "Wrist Watch", description: "Elegant wrist watch for formal and casual.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", price: 2999, inStock: true, categories: ["men", "accessories"], size: ["OneSize"], color: ["Black","Silver"] },
  
  // ── FOOTWEAR - WOMEN ───────────────────────────────────────
  { title: "Women's Running Shoes", description: "Comfortable running shoes with cushioning.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", price: 3499, inStock: true, categories: ["women", "footwear"], size: ["5","6","7","8","9","10"], color: ["White","Black","Pink"] },
  { title: "Women's Heels", description: "Elegant high heels for formal occasions.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", price: 2499, inStock: true, categories: ["women", "footwear"], size: ["5","6","7","8","9","10"], color: ["Black","Red","Gold"] },
  { title: "Women's Sneakers", description: "Casual and comfy sneakers for everyday wear.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800", price: 1999, inStock: true, categories: ["women", "footwear"], size: ["5","6","7","8","9","10"], color: ["White","Black","Pink"] },
  { title: "Sandals Women", description: "Stylish sandals perfect for summer.", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800", price: 1299, inStock: true, categories: ["women", "footwear"], size: ["5","6","7","8","9","10"], color: ["Black","Brown","Gold"] },
  
  // ── FOOTWEAR - MEN ─────────────────────────────────────────
  { title: "Men's Running Shoes", description: "High-performance running shoes.", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800", price: 3999, inStock: true, categories: ["men", "footwear"], size: ["7","8","9","10","11","12","13"], color: ["Black","White","Blue"] },
  { title: "Men's Casual Sneakers", description: "Versatile sneakers for everyday style.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", price: 2099, inStock: true, categories: ["men", "footwear"], size: ["7","8","9","10","11","12","13"], color: ["White","Black","Gray"] },
  { title: "Men's Formal Shoes", description: "Classic formal shoes for business wear.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800", price: 2999, inStock: true, categories: ["men", "footwear"], size: ["7","8","9","10","11","12","13"], color: ["Black","Brown"] },
  { title: "Men's Sandals", description: "Comfortable sandals for casual outings.", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800", price: 1399, inStock: true, categories: ["men", "footwear"], size: ["7","8","9","10","11","12","13"], color: ["Black","Brown","Tan"] },
]

async function seed() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
      console.log("Connected to database for seeding")
    }
    
    // Clear existing and re-seed
    await Product.deleteMany({})
    const inserted = await Product.insertMany(sampleProducts)
    console.log(`✅ Seeded ${inserted.length} products successfully`)
    
    if (require.main === module) {
      mongoose.connection.close()
      process.exit(0)
    }
  } catch (err) {
    console.error("Seed error:", err.message)
    if (require.main === module) process.exit(1)
  }
}

seed()
