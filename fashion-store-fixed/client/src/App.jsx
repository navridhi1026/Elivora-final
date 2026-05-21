import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from "@/ScrollToTop"

import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import NotFoundPage from "@/pages/404Page"
import ProductsPage from "@/pages/ProductsPage"
import ProductDetailsPage from "@/pages/ProductDetailsPage"
import CartPage from "@/pages/CartPage"
import OrdersPage from "@/pages/OrdersPage"
import OrderDetailsPage from "@/pages/OrderDetailsPage"
import AccountPage from "@/pages/AccountPage"
import WishlistPage from "@/pages/WishlistPage"
import SearchPage from "@/pages/SearchPage"
import VirtualTryOnPage from "@/pages/VirtualTryOnPage"
import InfluencerPage from "@/pages/InfluencerPage"
import FAQPage from "@/pages/FAQPage"
import api from '@/api'
import cartReducer, { initialCartState } from '@/reducers/cartReducer'
import useReducerWithLocalStorage from '@/hooks/useReducerWithLocalStorage'
import UserLayout from './layouts/UserLayout'

export const UserContext = createContext()
export const CartContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)
  const [cart, cartDispatch] = useReducerWithLocalStorage(cartReducer, initialCartState, "cart")
  
  useEffect(() => {
    ;(async () => {
      try {
        const resp = await api.fetchUserDetails()
        if (resp && resp.status === "ok") {
          setUser(resp.user)
        }
      } catch (err) {
        // API not available - user stays null
        console.warn("API unavailable:", err.message)
      }
    })()
  }, [])

  useEffect(() => {
    if (!user) return
    ;(async () => {
      try {
        const resp = await api.getUserCart()
        if (resp && resp.products) {
          cartDispatch({type: "SET_PRODUCTS", payload: resp.products})
        }
      } catch (err) {
        console.warn("Cart fetch failed:", err.message)
      }
    })()
  }, [user])

  return (
    <BrowserRouter>      
      <CartContext.Provider value={{cart, cartDispatch}}>
      <UserContext.Provider value={{user, setUser}}>
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={user ? <WishlistPage /> : <Navigate replace to="/login" />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="virtual-try-on" element={<VirtualTryOnPage />} />
            <Route path="virtual-tryon" element={<Navigate replace to="/virtual-try-on" />} />
            <Route path="influencers" element={<InfluencerPage />} />
            <Route path="faq" element={<FAQPage />} />

            <Route path="login" element={user ? <Navigate replace to="/" /> : <LoginPage />} />
            <Route path="register" element={user ? <Navigate replace to="/" /> : <RegisterPage />} />
            <Route path="account" element={user ? <AccountPage /> : <Navigate replace to="/login" />} />

            <Route path="products">
              <Route index element={<ProductsPage />} />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
            
            <Route path="orders">
              <Route index element={user ? <OrdersPage /> : <Navigate replace to="/login" />} />
              <Route path=":id" element={user ? <OrderDetailsPage /> : <Navigate replace to="/login" />} />
            </Route>
          </Route>
            
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </UserContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  )
}
