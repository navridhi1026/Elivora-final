import { useState, useCallback, useEffect } from 'react'
import ProductService from '@/services/ProductService'

/**
 * useProducts Hook
 * Manages product fetching and caching
 */
export function useProducts(filters = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ProductService.getAllProducts(filters)
      setProducts(data.products || data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

/**
 * useProductById Hook
 * Fetch single product by ID
 */
export function useProductById(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await ProductService.getProductById(id)
        setProduct(data.product || data)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}

/**
 * useProductSearch Hook
 * Search products with debouncing
 */
export function useProductSearch(query, delay = 300) {
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setSearching(true)
      setError(null)
      try {
        const data = await ProductService.searchProducts(query)
        setResults(data.products || data)
      } catch (err) {
        setError(err.message)
        console.error('Search failed:', err)
      } finally {
        setSearching(false)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  return { results, searching, error }
}

/**
 * useRecommendations Hook
 * Get product recommendations (useful for try-on, suggestions, etc.)
 */
export function useRecommendations(gender, category = null, limit = 6) {
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    // Only fetch if gender is provided
    if (!gender) {
      setRecommendations([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await ProductService.getRecommendations(gender, category, limit)
      setRecommendations(data.products || data)
    } catch (err) {
      setError(err.message)
      console.error('Failed to fetch recommendations:', err)
    } finally {
      setLoading(false)
    }
  }, [gender, category, limit])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { recommendations, loading, error, refetch: fetch }
}

/**
 * useFeaturedProducts Hook
 * Get featured/top products
 */
export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await ProductService.getFeaturedProducts(limit)
        setProducts(data.products || data)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch featured products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [limit])

  return { products, loading, error }
}
