# Elivora Fashion Store - Setup Guide

## Prerequisites
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)

## Quick Start

### 1. API Setup
```bash
cd api
npm install
```

Edit `api/.env`:
```
DB_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start API:
```bash
npm start
```

Seed products (first time only):
```bash
node seedProducts.js
```

### 2. Client Setup
```bash
cd client
npm install
```

Edit `client/.env`:
```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Start client:
```bash
npm run dev
```

Open: http://localhost:5173

## Fixes Applied
- ✅ Products now load correctly (Men, Women, All categories)
- ✅ Login/Register with full email and password validation
- ✅ Show/hide password toggle
- ✅ Professional dark/white color scheme (no pink)
- ✅ All navbar links work including Try-On route fix
- ✅ Virtual Try-On improved UI with WebRTC camera
- ✅ Home page category banners with hover effects
- ✅ Product cards with smooth hover animations
- ✅ User dropdown with avatar
- ✅ Responsive layout with sticky navbar
- ✅ Footer with all useful links
- ✅ API error handling (site won't crash if API is down)
- ✅ Loading skeletons for products
