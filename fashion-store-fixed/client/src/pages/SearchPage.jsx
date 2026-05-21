import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'react-feather'
import api from '../api'
import { CartContext, UserContext } from '@/App'
import ProductList from '@/ui/ProductList'
import Container from '@/components/Container'
import Loader from '@/components/Loader'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const {cartDispatch} = useContext(CartContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    searchProducts()
  }, [query])

  const searchProducts = async () => {
    setLoading(true)
    try {
      const resp = await api.fetchProducts()
      if (resp.status !== "error") {
        // Filter products based on search query
        const allProducts = Array.isArray(resp) ? resp : (resp.products || [])
        const filtered = allProducts.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
        )
        setProducts(filtered)
      }
    } catch (err) {
      console.error("Search error:", err)
    }
    setLoading(false)
  }

  const addToCart = async (product, quantity=1) => {
    if (user) {
      const resp = await api.addProductsToCart([{productID: product._id, quantity}])
      if (resp.status === "ok") {
        cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
      }
    } else {
      cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]})
    }
  }

  if (loading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <Loader color="bg-gray-600" />
      </main>
    )
  }

  return (
    <main>
      <Container heading={`Search Results for "${query}"`} type="page">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found matching "{query}"</p>
            <p className="text-gray-400 mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{products.length} product{products.length > 1 ? 's' : ''} found</p>
            <ProductList products={products} onAddToCart={addToCart} />
          </>
        )}
      </Container>
    </main>
  )
}
