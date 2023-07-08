/**
 * /bids/:id/bid-items
 * /bids/:id/
 * /bids
 *
 * /orders/:id/order-items/:order-id
 * /orders/:id/order-items
 * /orders
 *
 * /profile
 *
 * /auth/login
 *
 * /products/:id/
 * /products
 *
 * /categories/:id
 * /categories
 *
 * /brands
 * /brands/:id
 */

const URL = process.env.STORE_API_URL || 'http://localhost:3001'
const endpoints = {
  bids: {
    bidItems: (id) => `${URL}/bids/${id}/bid-items`,
    bid: (id) => `${URL}/bids/${id}`,
    bids: `${URL}/bids`
  },
  orders: {
    orderItems: (id, orderId) => `${URL}/orders/${id}/order-items/${orderId}`,
    allOrderItems: (id) => `${URL}/orders/${id}/order-items`,
    orders: `${URL}/orders`
  },
  profile: `${URL}/profile`,
  auth: {
    login: `${URL}/auth/login`,
    signup: `${URL}/auth/signup`
  },
  products: {
    product: (id) => `${URL}/products/${id}`,
    products: `${URL}/products`,
    brandProducts: (id) => `${URL}/products?brandId=${id}`
  },
  categories: {
    category: (id) => `${URL}/categories/${id}`,
    categories: `${URL}/categories`
  },
  brands: {
    brand: (id) => `${URL}/brands/${id}`,
    brands: `${URL}/brands`
  },
  about: 'https://uliassipirchio.me/projects/basic-store'
}

export default endpoints
