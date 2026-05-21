import React from 'react'
import { Link } from "react-router-dom"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "react-feather"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-black text-white tracking-tight mb-4">ELIVORA</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Your destination for modern fashion. Curated with care, delivered with love.
          </p>
          <ul className="flex space-x-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <li key={i}>
                <Link to="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Icon width={16} height={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Shop</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Men's Fashion", to: "/products?category=men" },
              { label: "Women's Fashion", to: "/products?category=women" },
              { label: "All Products", to: "/products" },
              { label: "New Arrivals", to: "/products?new=true" },
              { label: "Style Gallery", to: "/influencers" },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Account</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "My Account", to: "/account" },
              { label: "My Orders", to: "/orders" },
              { label: "Wishlist", to: "/wishlist" },
              { label: "Cart", to: "/cart" },
              { label: "Virtual Try-On", to: "/virtual-try-on" },
              { label: "FAQ & Help", to: "/faq" },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Ludhiana, Punjab, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <a href="mailto:support@elivora.in" className="hover:text-white transition-colors">
                support@elivora.in
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="payment providers" className="opacity-60 h-8" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Elivora. All rights reserved.
      </div>
    </footer>
  )
}
