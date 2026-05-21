import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Package, Heart, LogOut, ChevronDown } from 'react-feather'
import useClickOutside from '@/hooks/useClickOutside'

export default function UserDropDown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(v => !v)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-full pr-2 pl-1 py-1 transition-colors"
      >
        <img
          src={user.avatarSrc}
          alt={user.fullname}
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
        <ChevronDown width={14} height={14} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-sm text-gray-900 truncate">{user.fullname}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <ul className="py-1">
            <MenuItem to="/account" icon={<User width={15} height={15} />} onClick={() => setIsOpen(false)}>
              My Account
            </MenuItem>
            <MenuItem to="/orders" icon={<Package width={15} height={15} />} onClick={() => setIsOpen(false)}>
              My Orders
            </MenuItem>
            <MenuItem to="/wishlist" icon={<Heart width={15} height={15} />} onClick={() => setIsOpen(false)}>
              Wishlist
            </MenuItem>
            <li>
              <button
                onClick={() => { onLogout(); setIsOpen(false) }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut width={15} height={15} /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

function MenuItem({ to, icon, children, onClick }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {icon} {children}
      </Link>
    </li>
  )
}
