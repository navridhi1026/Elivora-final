# Quick Start Guide 🚀

## What's Fixed & New

### ✅ Fixed Issues
1. **Virtual Try-On** - Now properly uses MediaPipe pose detection with gender detection based on body proportions
2. **Professional Architecture** - Modular, reusable components and services
3. **Better Product Data** - 40+ professional products organized by gender and category

### 🆕 New Features
1. **ProductService** - Centralized API management layer
2. **Custom Hooks** - useProducts, useProductById, useRecommendations, useProductSearch, useFeaturedProducts
3. **ProductGrid Component** - Professional grid layout with loading, error, and empty states
4. **ProductCard Component** - Reusable product card with animations and hover effects
5. **Comprehensive Product Database** - Men's, Women's, and Unisex collections

---

## 🎯 Using the New Architecture

### 1. Display Products on Any Page
```javascript
import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/ProductGrid'

export default function ShirtsPage() {
  const { products, loading, error } = useProducts({
    category: 'shirts',
    gender: 'male'
  })

  return <ProductGrid products={products} loading={loading} error={error} />
}
```

### 2. Get Recommendations (like in Try-On)
```javascript
import { useRecommendations } from '@/hooks/useProducts'

function TryOnResults() {
  const { recommendations, loading } = useRecommendations('female', 'casual', 6)
  return <ProductGrid products={recommendations} loading={loading} />
}
```

### 3. Search Products
```javascript
import { useProductSearch } from '@/hooks/useProducts'

function SearchPage() {
  const [query, setQuery] = useState('')
  const { results, searching } = useProductSearch(query)

  return (
    <>
      <input onChange={(e) => setQuery(e.target.value)} />
      <ProductGrid products={results} loading={searching} />
    </>
  )
}
```

### 4. Fetch Individual Product
```javascript
import { useProductById } from '@/hooks/useProducts'

function ProductDetail({ id }) {
  const { product, loading } = useProductById(id)
  
  if (loading) return <Loader />
  return <div>{product.title} - ₹{product.price}</div>
}
```

---

## 📦 Products Available

### Men's Collection (101-108)
- Classic White Oxford Shirt
- Black Leather Jacket
- Blue Slim Fit Jeans
- Gray Hoodie Sweatshirt
- White Crew Neck T-Shirt
- Navy Formal Blazer
- Charcoal Chinos
- Leather Belt - Black

### Women's Collection (201-208)
- Elegant Black Blazer
- White Linen Shirt
- Skinny Blue Jeans
- Pink Cotton Hoodie
- Striped T-Shirt
- Formal Midi Dress
- Casual Linen Pants
- Gold Pendant Necklace

### Unisex Collection (301-305)
- Canvas Sneakers - White
- Canvas Tote Bag
- Baseball Cap - Black
- Wool Sweater
- Denim Jacket

---

## 🔄 How Try-On Works Now

1. User opens Virtual Try-On page
2. Camera starts, MediaPipe initializes
3. User stands in front of camera
4. System detects pose (shoulders, hips, etc.)
5. Clothing is rendered on canvas in real-time
6. When user clicks "Capture & Get Suggestions":
   - Gender is detected from shoulder-to-hip ratio
   - Pose landmarks are analyzed
   - Recommended products are fetched for that gender
   - ProductGrid displays top 6 suggestions

**Gender Detection Logic:**
- Calculates shoulder width vs hip width
- If ratio < 0.95 → Female
- If ratio ≥ 0.95 → Male

---

## 📝 Adding More Products

### Simple Way (Direct Data)
Edit `/client/src/data/productsData.js`:

```javascript
// Add to menProducts array
export const menProducts = [
  // ... existing products
  {
    id: 109,
    title: 'Premium Wool Coat',
    price: 8999,
    category: PRODUCT_CATEGORIES.JACKETS,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://example.com/coat.png',
    description: 'High quality wool coat for winters',
    rating: 4.9,
    reviews: 234,
  }
]
```

The data will automatically be available through:
```javascript
import { getProductsByGender } from '@/data/productsData'
const allMen = getProductsByGender('male')
```

### Backend Way (API)
If your backend is ready, just ensure it returns products in this format:
```json
{
  "products": [
    {
      "_id": "123",
      "title": "Product Name",
      "price": 1299,
      "image": "url",
      "rating": 4.5,
      "reviews": 100,
      "description": "..."
    }
  ]
}
```

---

## 🎨 Component Props Reference

### ProductCard
```javascript
<ProductCard
  id={product.id}                    // Required
  image={product.image}              // Required
  title={product.title}              // Required
  price={product.price}              // Required
  rating={4.5}                       // Optional (default: 4.5)
  reviews={128}                      // Optional (default: 0)
  discount={10}                      // Optional: percentage
  featured={true}                    // Optional: show badge
  compact={false}                    // Optional: dark theme
  onAddToCart={(item) => {}}         // Optional: callback
/>
```

### ProductGrid
```javascript
<ProductGrid
  products={[]}                      // Required
  loading={false}                    // Optional: show skeleton
  error={null}                       // Optional: error message
  columns={4}                        // Optional: responsive
  compact={false}                    // Optional: dark theme
  onAddToCart={(item) => {}}         // Optional: callback
  emptyMessage="No products"         // Optional
/>
```

---

## 🔧 Service Methods

All in `ProductService`:

```javascript
// Get products with filters
await ProductService.getAllProducts({ 
  gender: 'male', 
  category: 'shirts',
  limit: 10 
})

// Get by gender
await ProductService.getProductsByGender('female', 10)

// Get by category
await ProductService.getProductsByCategory('jackets', 20)

// Get single product
await ProductService.getProductById(101)

// Get recommendations
await ProductService.getRecommendations('male', 'casual', 6)

// Search
await ProductService.searchProducts('shirt', 20)

// Featured
await ProductService.getFeaturedProducts(8)

// New arrivals
await ProductService.getNewArrivals(8)

// Sale products
await ProductService.getSaleProducts(10)
```

---

## 🚀 File Locations

| File | Purpose |
|------|---------|
| `/components/ProductCard.jsx` | Individual product card |
| `/components/ProductGrid.jsx` | Grid layout for products |
| `/hooks/useProducts.js` | Custom hooks for products |
| `/services/ProductService.js` | API management |
| `/data/productsData.js` | Product database |
| `/pages/VirtualTryOnPage.jsx` | Try-on feature |
| `/utils/clothingRenderer.js` | Canvas rendering |

---

## 💡 Pro Tips

1. **Always use ProductGrid for product lists** - It handles loading, errors, and responsive layout
2. **Use hooks over direct API calls** - Hooks provide caching and easier state management
3. **ProductCard is responsive** - Works on mobile, tablet, desktop automatically
4. **Gender detection is automatic** - Try-on page detects gender from pose
5. **Easy to customize** - Colors, sizes, layout all in CSS files

---

## ❓ Common Tasks

### Show men's jackets
```javascript
const { products } = useProducts({ 
  gender: 'male', 
  category: 'jackets' 
})
```

### Show featured products
```javascript
const { products } = useFeaturedProducts(8)
```

### Show recommendations for try-on
```javascript
const { recommendations } = useRecommendations('female', 'casual')
```

### Search for products
```javascript
const { results } = useProductSearch('shirt')
```

### Get top-rated products
```javascript
import { getFeaturedProducts } from '@/data/productsData'
const topProducts = getFeaturedProducts(10)
```

---

## 🎯 Next Steps

1. ✅ Test Virtual Try-On with your camera
2. ✅ Try clicking "Capture & Get Suggestions"
3. ✅ Check if products display correctly
4. 📝 Add more products as needed
5. 🔗 Connect backend API when ready
6. 🎨 Customize colors/styling to match brand

---

**Happy coding! 🎉**
