# Professional Fashion Store Architecture 🎨

## Overview
This is a modern, modular, and professional e-commerce fashion store built with React, featuring a virtual try-on system powered by MediaPipe pose detection.

---

## 📁 Architecture Structure

### `/client/src/`
```
├── components/          # Reusable UI Components
│   ├── ProductCard.jsx       # Individual product card
│   ├── ProductCard.css       # Card styling
│   ├── ProductGrid.jsx       # Grid layout for products
│   └── ProductGrid.css       # Grid styling
│
├── services/           # API & Business Logic
│   └── ProductService.js     # Centralized product API calls
│
├── hooks/              # Custom React Hooks
│   ├── usePoseDetection.js   # MediaPipe pose detection
│   └── useProducts.js        # Product data management
│
├── data/               # Static Data
│   └── productsData.js       # Professional product database
│
├── pages/              # Page Components
│   └── VirtualTryOnPage.jsx  # Virtual try-on feature
│
└── utils/              # Utilities
    └── clothingRenderer.js   # Canvas rendering logic
```

---

## 🎯 Key Features

### 1. **Virtual Try-On System**
- ✅ Real-time pose detection using MediaPipe
- ✅ Gender detection based on body proportions
- ✅ AI-powered product suggestions
- ✅ Professional UI with FPS monitoring

**How it works:**
1. Camera captures user's pose in real-time
2. MediaPipe detects body landmarks
3. Clothing is rendered on canvas with proper transformation
4. Gender is detected from shoulder-to-hip ratio
5. Recommended products are fetched based on detected gender

---

## 🔧 Professional Services Layer

### ProductService
The `ProductService` class provides a clean API interface:

```javascript
// Fetch all products
const products = await ProductService.getAllProducts({ 
  gender: 'male', 
  category: 'jackets' 
})

// Get single product
const product = await ProductService.getProductById(id)

// Get recommendations
const recs = await ProductService.getRecommendations('female', 'casual', 6)

// Search products
const results = await ProductService.searchProducts('jacket')

// Get featured products
const featured = await ProductService.getFeaturedProducts(8)
```

**Benefits:**
- Centralized API management
- Error handling & fallbacks
- Easy to extend with new endpoints
- Consistent error logging

---

## 🪝 Custom Hooks

### useProducts
```javascript
import { useProducts } from '@/hooks/useProducts'

function MyComponent() {
  const { products, loading, error, refetch } = useProducts({
    gender: 'male',
    category: 'shirts',
    limit: 10
  })
  
  return (
    <ProductGrid 
      products={products} 
      loading={loading}
    />
  )
}
```

### useProductById
```javascript
import { useProductById } from '@/hooks/useProducts'

function ProductDetail({ id }) {
  const { product, loading, error } = useProductById(id)
  
  if (loading) return <Loader />
  if (error) return <Error message={error} />
  return <ProductDetails product={product} />
}
```

### useRecommendations
```javascript
import { useRecommendations } from '@/hooks/useProducts'

function TryOnSuggestions({ gender }) {
  const { recommendations, loading } = useRecommendations(gender, 'casual', 6)
  return <ProductGrid products={recommendations} loading={loading} />
}
```

### useProductSearch
```javascript
import { useProductSearch } from '@/hooks/useProducts'

function SearchResults({ query }) {
  const { results, searching } = useProductSearch(query)
  return <ProductGrid products={results} loading={searching} />
}
```

### useFeaturedProducts
```javascript
import { useFeaturedProducts } from '@/hooks/useProducts'

function Featured() {
  const { products, loading } = useFeaturedProducts(8)
  return <ProductGrid products={products} loading={loading} />
}
```

---

## 🎨 Reusable Components

### ProductCard
A professional, reusable product card component:

```javascript
import ProductCard from '@/components/ProductCard'

<ProductCard
  id={product.id}
  image={product.image}
  title={product.title}
  price={product.price}
  rating={product.rating}
  reviews={product.reviews}
  discount={10}
  featured={true}
  compact={false}
  onAddToCart={(item) => addToCart(item)}
/>
```

**Props:**
- `id` - Product ID
- `image` - Product image URL
- `title` - Product title
- `price` - Price in rupees
- `rating` - Rating (0-5)
- `reviews` - Number of reviews
- `discount` - Discount percentage (optional)
- `featured` - Show featured badge
- `compact` - Use dark/compact theme
- `onAddToCart` - Callback when add to cart clicked

**Features:**
- Hover animations
- Dynamic pricing with discounts
- Star ratings
- Responsive design
- Loading states
- Image error handling

---

### ProductGrid
Professional grid layout for displaying products:

```javascript
import ProductGrid from '@/components/ProductGrid'

<ProductGrid
  products={products}
  loading={loading}
  error={error}
  columns={4}
  compact={false}
  onAddToCart={handleAddToCart}
  emptyMessage="No products found"
/>
```

**Props:**
- `products` - Array of products
- `loading` - Loading state
- `error` - Error message
- `columns` - Number of columns (responsive)
- `compact` - Use dark theme
- `onAddToCart` - Callback
- `emptyMessage` - Message when no products

**Features:**
- Skeleton loading animation
- Empty state design
- Error state design
- Responsive grid layout
- Auto-adjusts columns on mobile

---

## 📊 Product Data Structure

### Product Object
```javascript
{
  id: 101,
  title: 'Classic White Oxford Shirt',
  price: 1299,
  category: 'shirts',
  gender: 'male',
  image: 'https://...',
  description: 'Premium cotton shirt...',
  rating: 4.5,
  reviews: 128,
  discount: 10  // optional
}
```

### Available Categories
```javascript
PRODUCT_CATEGORIES = {
  SHIRTS: 'shirts',
  JACKETS: 'jackets',
  DENIM: 'denim',
  HOODIES: 'hoodies',
  TSHIRTS: 'tshirts',
  FORMAL: 'formal',
  CASUAL: 'casual',
  ACCESSORIES: 'accessories',
}
```

### Available Genders
```javascript
GENDER_CATEGORIES = {
  MALE: 'male',
  FEMALE: 'female',
  UNISEX: 'unisex',
}
```

### Database Functions
```javascript
import { 
  getAllProducts,
  getProductsByGender,
  getProductsByCategory,
  getProductsByGenderAndCategory,
  getProductById,
  searchProducts,
  getFeaturedProducts,
  getRecommendations,
  GENDER_CATEGORIES,
  PRODUCT_CATEGORIES
} from '@/data/productsData'

// Get all male products
const males = getProductsByGender(GENDER_CATEGORIES.MALE)

// Get casual women's items
const casual = getProductsByGenderAndCategory(
  GENDER_CATEGORIES.FEMALE, 
  PRODUCT_CATEGORIES.CASUAL
)

// Search
const results = searchProducts('shirt')

// Get top 8 products
const featured = getFeaturedProducts(8)

// Get recommendations for female users in casual category
const recs = getRecommendations('female', 'casual', 6)
```

---

## 🔄 Data Flow

### Product Page Example
```
User navigates to /products
    ↓
Page Component loads
    ↓
useProducts hook calls ProductService.getAllProducts()
    ↓
ProductService makes API call to /api/products
    ↓
Products returned to hook
    ↓
Hook updates component state
    ↓
Component renders ProductGrid
    ↓
ProductGrid renders ProductCard components
    ↓
User sees products!
```

### Try-On Workflow
```
User opens VirtualTryOnPage
    ↓
Camera starts, MediaPipe initializes
    ↓
User poses for camera
    ↓
User clicks "Capture & Get Suggestions"
    ↓
Gender detected from pose landmarks
    ↓
useRecommendations hook called with detected gender
    ↓
ProductService fetches recommendations
    ↓
ProductGrid displays suggestions
    ↓
User can click products to view details or add to cart
```

---

## 🚀 How to Use This Architecture

### Adding a New Product Page
```javascript
// pages/MyProductPage.jsx
import { useProducts } from '@/hooks/useProducts'
import ProductGrid from '@/components/ProductGrid'

export default function MyProductPage() {
  const { products, loading, error } = useProducts({
    gender: 'male',
    category: 'casual'
  })

  const handleAddToCart = (product) => {
    // Add to cart logic
    console.log('Added to cart:', product)
  }

  return (
    <div>
      <h1>Casual Men's Collection</h1>
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
        columns={4}
      />
    </div>
  )
}
```

### Fetching Specific Products
```javascript
// Using ProductService directly
import ProductService from '@/services/ProductService'

async function getMyProducts() {
  try {
    // Get women's jackets
    const data = await ProductService.getAllProducts({
      gender: 'female',
      category: 'jackets'
    })
    
    console.log(data.products)
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

### Adding Custom Search
```javascript
import { useProductSearch } from '@/hooks/useProducts'

function SearchComponent() {
  const [query, setQuery] = useState('')
  const { results, searching } = useProductSearch(query)

  return (
    <>
      <input 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      <ProductGrid products={results} loading={searching} />
    </>
  )
}
```

---

## 💾 Adding More Products

### Option 1: Direct Data
Edit `/client/src/data/productsData.js`:

```javascript
export const menProducts = [
  {
    id: 401,
    title: 'Premium T-Shirt',
    price: 899,
    category: PRODUCT_CATEGORIES.TSHIRTS,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://...',
    description: '100% organic cotton',
    rating: 4.8,
    reviews: 456,
  },
  // Add more products...
]
```

### Option 2: Backend API
The service layer is designed to fetch from API endpoints:
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/suggestions?gender=male` - Get recommendations
- `GET /api/search?q=shirt` - Search products

---

## 🎯 Next Steps

1. **Connect to Backend API**
   - Update `ProductService` endpoints to match your backend
   - Ensure backend returns products with required fields

2. **Expand Product Database**
   - Add more products to `productsData.js`
   - Or connect to MongoDB/database

3. **Enhance Try-On**
   - Add more clothing items
   - Improve gender detection algorithm
   - Add size recommendation

4. **Add More Pages**
   - Use the provided hooks and components
   - Follow the same pattern for consistency

5. **Performance Optimization**
   - Implement image lazy loading
   - Add pagination for products
   - Cache ProductService responses

---

## 📞 Support

For issues or questions about the architecture, refer to:
- Component props documentation above
- Service methods in `ProductService.js`
- Hook implementations in `useProducts.js`
- Product data structure in `productsData.js`

---

**Built with ❤️ for a professional fashion store**
