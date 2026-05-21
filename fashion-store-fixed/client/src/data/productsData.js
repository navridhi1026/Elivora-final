// Professional Product Database
// Organized by category and gender for easy filtering

export const PRODUCT_CATEGORIES = {
  SHIRTS: 'shirts',
  JACKETS: 'jackets',
  DENIM: 'denim',
  HOODIES: 'hoodies',
  TSHIRTS: 'tshirts',
  FORMAL: 'formal',
  CASUAL: 'casual',
  ACCESSORIES: 'accessories',
}

export const GENDER_CATEGORIES = {
  MALE: 'male',
  FEMALE: 'female',
  UNISEX: 'unisex',
}

// Men's Collection
export const menProducts = [
  {
    id: 101,
    title: 'Classic White Oxford Shirt',
    price: 1299,
    category: PRODUCT_CATEGORIES.SHIRTS,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
    description: 'Premium cotton oxford shirt, perfect for office or casual wear',
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 102,
    title: 'Black Leather Jacket',
    price: 4999,
    category: PRODUCT_CATEGORIES.JACKETS,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://www.prada.com/content/dam/pradanux_products/2/2TE/2TE183/3LJ6F0964/2TE183_3LJ6_F0964_SLR.png',
    description: 'Genuine leather jacket with classic styling',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 103,
    title: 'Blue Slim Fit Jeans',
    price: 2499,
    category: PRODUCT_CATEGORIES.DENIM,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388',
    description: 'Comfortable slim fit denim with perfect stretch',
    rating: 4.3,
    reviews: 156,
  },
  {
    id: 104,
    title: 'Gray Hoodie Sweatshirt',
    price: 1799,
    category: PRODUCT_CATEGORIES.HOODIES,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png',
    description: 'Soft fleece hoodie, perfect for casual days',
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 105,
    title: 'White Crew Neck T-Shirt',
    price: 599,
    category: PRODUCT_CATEGORIES.TSHIRTS,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
    description: '100% cotton premium t-shirt',
    rating: 4.4,
    reviews: 342,
  },
  {
    id: 106,
    title: 'Navy Formal Blazer',
    price: 5499,
    category: PRODUCT_CATEGORIES.FORMAL,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
    description: 'Professional navy blazer for office and events',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 107,
    title: 'Charcoal Chinos',
    price: 2099,
    category: PRODUCT_CATEGORIES.CASUAL,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png',
    description: 'Premium chino pants for everyday wear',
    rating: 4.5,
    reviews: 124,
  },
  {
    id: 108,
    title: 'Leather Belt - Black',
    price: 899,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    gender: GENDER_CATEGORIES.MALE,
    image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
    description: 'Classic black leather belt',
    rating: 4.6,
    reviews: 256,
  },
]

// Women's Collection
export const womenProducts = [
  {
    id: 201,
    title: 'Elegant Black Blazer',
    price: 4499,
    category: PRODUCT_CATEGORIES.JACKETS,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
    description: 'Tailored black blazer with modern design',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 202,
    title: 'White Linen Shirt',
    price: 1599,
    category: PRODUCT_CATEGORIES.SHIRTS,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388',
    description: 'Light linen shirt perfect for summer',
    rating: 4.5,
    reviews: 178,
  },
  {
    id: 203,
    title: 'Skinny Blue Jeans',
    price: 2299,
    category: PRODUCT_CATEGORIES.DENIM,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png',
    description: 'Perfect fit skinny jeans with stretch fabric',
    rating: 4.6,
    reviews: 289,
  },
  {
    id: 204,
    title: 'Pink Cotton Hoodie',
    price: 1899,
    category: PRODUCT_CATEGORIES.HOODIES,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
    description: 'Cozy pink hoodie for casual comfort',
    rating: 4.7,
    reviews: 301,
  },
  {
    id: 205,
    title: 'Striped T-Shirt',
    price: 799,
    category: PRODUCT_CATEGORIES.TSHIRTS,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
    description: 'Classic striped t-shirt in multiple colors',
    rating: 4.4,
    reviews: 412,
  },
  {
    id: 206,
    title: 'Formal Midi Dress',
    price: 3999,
    category: PRODUCT_CATEGORIES.FORMAL,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://www.prada.com/content/dam/pradanux_products/2/2TE/2TE183/3LJ6F0964/2TE183_3LJ6_F0964_SLR.png',
    description: 'Elegant midi dress for special occasions',
    rating: 4.9,
    reviews: 145,
  },
  {
    id: 207,
    title: 'Casual Linen Pants',
    price: 1999,
    category: PRODUCT_CATEGORIES.CASUAL,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
    description: 'Comfortable linen pants for summer',
    rating: 4.5,
    reviews: 167,
  },
  {
    id: 208,
    title: 'Gold Pendant Necklace',
    price: 1299,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    gender: GENDER_CATEGORIES.FEMALE,
    image: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
    description: 'Elegant gold pendant necklace',
    rating: 4.7,
    reviews: 198,
  },
]

// Unisex Collection
export const unisexProducts = [
  {
    id: 301,
    title: 'Canvas Sneakers - White',
    price: 2499,
    category: PRODUCT_CATEGORIES.CASUAL,
    gender: GENDER_CATEGORIES.UNISEX,
    image: 'https://www.prada.com/content/dam/pradanux_products/2/2TE/2TE183/3LJ6F0964/2TE183_3LJ6_F0964_SLR.png',
    description: 'Classic white canvas sneakers',
    rating: 4.6,
    reviews: 523,
  },
  {
    id: 302,
    title: 'Canvas Tote Bag',
    price: 899,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    gender: GENDER_CATEGORIES.UNISEX,
    image: 'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
    description: 'Durable canvas tote bag',
    rating: 4.5,
    reviews: 412,
  },
  {
    id: 303,
    title: 'Baseball Cap - Black',
    price: 599,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    gender: GENDER_CATEGORIES.UNISEX,
    image: 'd3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
    description: 'Classic black baseball cap',
    rating: 4.4,
    reviews: 289,
  },
  {
    id: 304,
    title: 'Wool Sweater',
    price: 2899,
    category: PRODUCT_CATEGORIES.CASUAL,
    gender: GENDER_CATEGORIES.UNISEX,
    image: 'https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png',
    description: 'Premium wool sweater for all seasons',
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 305,
    title: 'Denim Jacket',
    price: 2799,
    category: PRODUCT_CATEGORIES.JACKETS,
    gender: GENDER_CATEGORIES.UNISEX,
    image: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
    description: 'Classic denim jacket that goes with everything',
    rating: 4.8,
    reviews: 456,
  },
]

/**
 * Get all products
 */
export function getAllProducts() {
  return [...menProducts, ...womenProducts, ...unisexProducts]
}

/**
 * Get products by gender
 */
export function getProductsByGender(gender) {
  switch (gender) {
    case GENDER_CATEGORIES.MALE:
      return menProducts
    case GENDER_CATEGORIES.FEMALE:
      return womenProducts
    case GENDER_CATEGORIES.UNISEX:
      return unisexProducts
    default:
      return getAllProducts()
  }
}

/**
 * Get products by category
 */
export function getProductsByCategory(category) {
  return getAllProducts().filter(p => p.category === category)
}

/**
 * Get products by gender and category
 */
export function getProductsByGenderAndCategory(gender, category) {
  return getProductsByGender(gender).filter(p => p.category === category)
}

/**
 * Get product by ID
 */
export function getProductById(id) {
  return getAllProducts().find(p => p.id === id)
}

/**
 * Search products
 */
export function searchProducts(query) {
  const q = query.toLowerCase()
  return getAllProducts().filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  )
}

/**
 * Get featured products (top rated)
 */
export function getFeaturedProducts(limit = 8) {
  return getAllProducts()
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, limit)
}

/**
 * Get recommendations based on gender and category
 */
export function getRecommendations(gender, category, limit = 6) {
  let products = getProductsByGender(gender)
  
  if (category) {
    products = products.filter(p => p.category === category)
  }
  
  return products
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, limit)
}
