const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function setAccessToken(token) {
  localStorage.setItem('token', token)
}
function getAccessToken() {
  return localStorage.getItem('token')
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}
function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

async function safeRequest(url, options = {}) {
  try {
    const resp = await fetch(url, options)
    if (!resp.ok && resp.status === 0) throw new Error('Network error')
    return await resp.json()
  } catch (err) {
    console.warn('Request failed:', url, err.message)
    return { status: 'error', message: err.message }
  }
}

async function registerUser({fullname, email, password}) {
  return safeRequest(API_URL + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({fullname, email, password}),
  })
}

async function loginUser({email, password}) {
  const data = await safeRequest(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email, password}),
  })

  if (data.accessToken) {
    setAccessToken(data.accessToken)
    await fetchUserDetails()
  }
  return data
}

function logoutUser() {
  localStorage.clear()
}

async function createUserCart(products) {
  return safeRequest(API_URL + "/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify(products.length ? {products} : {}),
  })
}

async function getUserCart() {
  const user = getUser()
  if (!user || !user._id) return { status: "error", products: [] }
  
  const cart = await safeRequest(API_URL + "/carts/" + user._id, {
    headers: { "x-access-token": getAccessToken() }
  })

  if (cart && cart.products) {
    cart.products = cart.products
      .filter(product => product && product.productID && product.productID._id)
      .map(product => ({
        id: product.productID._id,
        title: product.productID.title,
        price: product.productID.price,
        image: product.productID.image,
        quantity: product.quantity,
      }))
  }
  return cart
}

async function addProductsToCart(products) {
  const user = getUser()
  if (!user) return { status: "error", message: "Not logged in" }
  return safeRequest(API_URL + "/carts/" + user._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify({products}),
  })
}

async function removeProductFromCart(productID) {
  return patchCart(productID, 0)
}

async function patchCart(productID, quantity) {
  const user = getUser()
  if (!user) return { status: "error" }
  return safeRequest(API_URL + "/carts/" + user._id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify({productID, quantity}),
  })
}

async function clearCart() {
  return safeRequest(API_URL + "/carts/clear", {
    method: "POST",
    headers: { "x-access-token": getAccessToken() },
  })
}

async function fetchUserDetails() {
  const token = getAccessToken()
  if (!token) return { status: "error", message: "No token" }
  
  const data = await safeRequest(API_URL + "/users/me", {
    headers: { "x-access-token": token }
  })
  
  if (data.status === "ok" && data.user) {
    if (!data.user.avatarSrc) {
      data.user.avatarSrc = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(data.user.fullname)}`
    }
    setUser(data.user)
  }
  return data
}

async function fetchProducts(category, newArrivals = false) {
  let query = `new=${newArrivals ? "true" : "false"}${category ? "&category=" + category : ""}`
  return safeRequest(API_URL + "/products?" + query)
}

async function fetchProduct(id) {
  return safeRequest(API_URL + "/products/" + id)
}

async function proceedCheckout() {
  return safeRequest(API_URL + "/checkout/payment", {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
  })
}

async function createPaymentOrder(amount) {
  return safeRequest(API_URL + "/api/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify({ amount }),
  })
}

async function verifyPayment(paymentData) {
  return safeRequest(API_URL + "/api/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify(paymentData),
  })
}

async function createOrder(products, amount, address) {
  return safeRequest(API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify({
      products: products.map(p => ({productID: p.id, quantity: p.quantity})),
      amount,
      address
    }),
  })
}

async function fetchAllOrders() {
  const user = getUser()
  if (!user) return []
  return safeRequest(API_URL + "/orders/user/" + user._id, {
    headers: { "x-access-token": getAccessToken() }
  })
}

async function fetchOrderDetails(orderID) {
  return safeRequest(API_URL + "/orders/" + orderID, {
    headers: { "x-access-token": getAccessToken() }
  })
}

async function getWishlist() {
  return safeRequest(API_URL + "/wishlist", {
    headers: { "x-access-token": getAccessToken() }
  })
}

async function addToWishlist(productID) {
  return safeRequest(API_URL + "/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify({ productID }),
  })
}

async function removeFromWishlist(productID) {
  return safeRequest(API_URL + "/wishlist/" + productID, {
    method: "DELETE",
    headers: { "x-access-token": getAccessToken() }
  })
}

async function updateOrderStatus(orderID, status) {
  return safeRequest(API_URL + '/orders/' + orderID + '/status', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getAccessToken(),
    },
    body: JSON.stringify({ status }),
  })
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  fetchUserDetails,
  fetchProducts,
  fetchProduct,
  createUserCart,
  getUserCart,
  addProductsToCart,
  removeProductFromCart,
  patchCart,
  clearCart,
  proceedCheckout,
  createOrder,
  fetchAllOrders,
  fetchOrderDetails,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  createPaymentOrder,
  verifyPayment,
  updateOrderStatus,
}
