# Elivora Fashion Store

## Quick Start

```bash
# Terminal 1 - Start API
cd api
npm install
npm run dev
```

```bash
# Terminal 2 - Start Client
cd client
npm install
npm run dev
```

Open: http://localhost:5173

## First Run - Products will auto-seed!
When API starts and database is empty, products are seeded automatically.
No manual seeding needed.

## Environment Setup

### api/.env (already configured)
```
DB_URL=mongodb://...your_atlas_url...
PORT=5000
JWT_SECRET=your-secret-key
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

### client/.env
```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=...
```

## Features Fixed
- ✅ Auto product seeding (24 products - men + women)
- ✅ Login/Register with email validation
- ✅ Professional black & white theme (no pink)
- ✅ Virtual Try-On with AI gender detection
- ✅ AI-powered outfit suggestions after photo capture
- ✅ All buttons have hover effects
- ✅ Men/Women categories all working
- ✅ Route fixes (/virtual-try-on)
