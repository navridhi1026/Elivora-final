import React, { useContext, useState } from 'react'
import clsx from "clsx"
import { Link, useNavigate } from "react-router-dom"
import { Menu, Search, User, LogIn, X, ShoppingCart, Heart } from "react-feather"

import { UserContext, CartContext } from '@/App'
import Button from "@/components/Button"
import Input from "@/components/Input"
import UserDropDown from '@/components/UserDropDown'
import api from "@/api"
import useClickOutside from '@/hooks/useClickOutside'

export default function Navbar() {
  const {user, setUser} = useContext(UserContext)
  const {cart, cartDispatch} = useContext(CartContext)
  const [showMenu, setShowMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const navbarRef = useClickOutside(() => setShowMenu(false))

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowMenu(false)
    }
  }

  return (
    <>
      {/* Announcement Banner */}
      <div className="w-full bg-gray-900 text-white text-center py-2 px-4 text-xs font-medium tracking-widest uppercase">
        Free Shipping on Orders Above ₹999 &nbsp;·&nbsp; New Arrivals Every Week
      </div>
      
      <nav className={clsx(
        "w-full flex flex-wrap justify-between items-center",
        "sticky top-0 z-40 py-4 px-6",
        "bg-white border-b border-gray-200 shadow-sm"
      )} ref={navbarRef}>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h3 className="text-2xl font-black tracking-tight text-gray-900 hover:text-gray-600 transition-colors">
              ELIVORA
            </h3>
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-2 md:order-2">
          {user && (
            <Link to="/wishlist" className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100" title="Wishlist">
              <Heart width={20} height={20} />
            </Link>
          )}
          <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100">
            <ShoppingCart width={20} height={20} />
            {cart.products.length > 0 &&
              <div className="absolute -top-0 -right-0 w-4 h-4 bg-gray-900 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {cart.products.length}
              </div>
            }
          </Link>
          {user && 
            <UserDropDown user={user} onLogout={() => {
              api.logoutUser()
              setUser(null)
              cartDispatch({type: "RESET"})
            }} />
          }
          <button className="md:hidden p-2 text-gray-500 hover:text-gray-900 focus:outline-none">
            {showMenu 
              ? <X width={22} height={22} onClick={() => setShowMenu(false)} />
              : <Menu width={22} height={22} onClick={() => setShowMenu(true)} />
            }
          </button>
        </div>

        {/* Nav */}
        <div className={clsx(
          "hidden w-full",
          showMenu && "!flex flex-col mt-4",
          "md:flex md:flex-row md:mt-0 md:ml-auto md:order-1 md:w-auto md:items-center"
        )}>
          <ul className={clsx(
            "flex flex-col items-center",
            "mt-3 mb-2 text-sm space-y-1",
            "md:flex-row md:mt-0 md:mb-0 md:space-y-0 md:space-x-1"
          )} onClick={() => setShowMenu(false)}>
            <NavLink to="/products?category=men">Men</NavLink>
            <NavLink to="/products?category=women">Women</NavLink>
            <NavLink to="/products">All Products</NavLink>
            <NavLink to="/virtual-try-on">✨ Try-On</NavLink>
            <NavLink to="/influencers">Style Gallery</NavLink>
          </ul>
          <form onSubmit={handleSearch} className="flex items-center md:ml-3 mt-2 md:mt-0">
            <Input
              className="md:w-44 text-sm"
              icon={<Search width={15} height={15} />}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {!user && (
            <ul className="flex flex-col mt-2 md:flex-row md:mt-0 md:ml-2 md:space-x-1">
              <li>
                <Link to="/login">
                  <Button secondary className="w-full md:w-auto text-xs px-4 py-2">
                    <LogIn width={14} height={14} className="mr-1" />Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button className="w-full md:w-auto text-xs px-4 py-2">
                    <User width={14} height={14} className="mr-1" />Register
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}

function NavLink({ children, to }) {
  return (
    <li>
      <Link to={to} className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 truncate">
        {children}
      </Link>
    </li>
  )
}
