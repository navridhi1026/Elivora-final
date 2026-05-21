import React from "react"
import Navbar from "@/ui/Navbar"
import Footer from "@/ui/Footer"
import { Outlet } from "react-router-dom"

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout
