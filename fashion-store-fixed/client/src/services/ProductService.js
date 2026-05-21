/**
 * Professional Product Service
 * Handles all product-related API calls and data management
 * Provides a clean interface for components to use
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class ProductService {
  /**
   * Fetch all products
   */
  static async getAllProducts(filters = {}) {
    try {
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.gender) params.append('gender', filters.gender)
      if (filters.limit) params.append('limit', filters.limit)
      
      const response = await fetch(`${API_URL}/products?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.getAllProducts error:', error)
      throw error
    }
  }

  /**
   * Get single product by ID
   */
  static async getProductById(id) {
    try {
      const response = await fetch(`${API_URL}/product/${id}`)
      if (!response.ok) throw new Error('Product not found')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.getProductById error:', error)
      throw error
    }
  }

  /**
   * Get products by gender
   */
  static async getProductsByGender(gender, limit = 10) {
    try {
      return await this.getAllProducts({ gender, limit })
    } catch (error) {
      console.error('ProductService.getProductsByGender error:', error)
      throw error
    }
  }

  /**
   * Get featured/recommended products
   */
  static async getFeaturedProducts(limit = 8) {
    try {
      const response = await fetch(`${API_URL}/products/featured?limit=${limit}`)
      if (!response.ok) throw new Error('Failed to fetch featured products')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.getFeaturedProducts error:', error)
      throw error
    }
  }

  /**
   * Get product recommendations (e.g., for try-on suggestions)
   */
  static async getRecommendations(gender, category = null, limit = 6) {
    try {
      const params = new URLSearchParams({ gender, limit })
      if (category) params.append('category', category)
      
      const response = await fetch(`${API_URL}/suggestions?${params.toString()}`)
      
      // If endpoint doesn't exist, fall back to regular products
      if (response.status === 404) {
        return await this.getAllProducts({ gender, limit })
      }
      
      if (!response.ok) throw new Error('Failed to fetch recommendations')
      
      const data = await response.json()
      return data.products || data
    } catch (error) {
      console.error('ProductService.getRecommendations error:', error)
      return { products: [] }
    }
  }

  /**
   * Search products by query
   */
  static async searchProducts(query, limit = 20) {
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`)
      if (!response.ok) throw new Error('Search failed')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.searchProducts error:', error)
      throw error
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(category, limit = 20) {
    try {
      return await this.getAllProducts({ category, limit })
    } catch (error) {
      console.error('ProductService.getProductsByCategory error:', error)
      throw error
    }
  }

  /**
   * Get new arrivals
   */
  static async getNewArrivals(limit = 8) {
    try {
      const response = await fetch(`${API_URL}/products/new?limit=${limit}`)
      if (!response.ok) throw new Error('Failed to fetch new arrivals')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.getNewArrivals error:', error)
      throw error
    }
  }

  /**
   * Get on-sale products
   */
  static async getSaleProducts(limit = 10) {
    try {
      const response = await fetch(`${API_URL}/products/sale?limit=${limit}`)
      if (!response.ok) throw new Error('Failed to fetch sale products')
      
      return await response.json()
    } catch (error) {
      console.error('ProductService.getSaleProducts error:', error)
      throw error
    }
  }
}

export default ProductService
