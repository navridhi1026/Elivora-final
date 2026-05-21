import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import ProductList from "@/ui/ProductList"
import Container from "@/components/Container"
import FilterPanel from "@/components/FilterPanel"
import api from "../api"
import { CartContext, UserContext } from "@/App"

const sortOptions = [
  { label: "Popular", value: 0 },
  { label: "Newest", value: 1 },
  { label: "Price: Low → High", value: 2 },
  { label: "Price: High → Low", value: 3 },
]

export default function ProductsPage() {
  const {cartDispatch} = useContext(CartContext)
  const {user} = useContext(UserContext)
  const query = new URLSearchParams(useLocation().search)
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ types: [], sizes: [] })
  const [sort, setSort] = useState(0)
  const [loading, setLoading] = useState(true)

  const category = query.get("category")

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const resp = await api.fetchProducts(category)
      if (Array.isArray(resp)) {
        setAllProducts(resp)
        setProducts(resp)
      } else if (resp && resp.products) {
        setAllProducts(resp.products)
        setProducts(resp.products)
      } else {
        setAllProducts([])
        setProducts([])
      }
      setLoading(false)
    })()
    setFilters({ types: [], sizes: [] })
  }, [category])

  useEffect(() => {
    let sorted = [...products]
    switch (sort) {
      case 1: sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break
      case 2: sorted.sort((a, b) => a.price - b.price); break
      case 3: sorted.sort((a, b) => b.price - a.price); break
      default: break
    }
    if (sort !== 0) setProducts(sorted)
  }, [sort])

  useEffect(() => {
    let filtered = [...allProducts]
    if (filters.types.length > 0) {
      filtered = filtered.filter(p => p.categories?.some(c => filters.types.includes(c)))
    }
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.size?.some(s => filters.sizes.includes(s)))
    }
    setProducts(filtered)
  }, [filters, allProducts])

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

  return (
    <main>
      <Container type="page" heading={category ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Fashion` : "All Products"}>
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0">
            <div className="sticky top-20">
              {/* Sort */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Sort By</h3>
                <div className="space-y-1">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSort(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sort === option.value
                          ? 'bg-gray-900 text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <FilterPanel category={category} filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
            </p>
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-4xl mb-4">👕</p>
                <p className="font-medium text-lg">No products found</p>
                <p className="text-sm mt-2">Try changing your filters or check that the API server is running</p>
              </div>
            ) : (
              <ProductList products={products} onAddToCart={addToCart} />
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
