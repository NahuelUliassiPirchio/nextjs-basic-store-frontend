import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      clearCart: () => {
        set(state => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0
        }))
      },
      addToCart: (product) => {
        const cart = get().cart
        const cartItem = cart.find(item => item.id === product.id)

        if (cartItem) {
          const updatedCart = cart.map(item =>
            item.id === product.id ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
          )
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price
          }))
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }]

          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price
          }))
        }
      },
      removeFromCart: (product) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - (product.price * get().cart.find(item => item.id === product.id).quantity || 1)
        }))
      },
      updateQuantity: (product, amount) => {
        const cart = get().cart
        const cartItem = cart.find(item => item.id === product.id)

        if (cartItem) {
          if (cartItem.quantity + amount === 0) {
            return
          }
          const updatedCart = cart.map(item =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + amount === 0 ? 1 : parseInt(item.quantity) + amount
                }
              : item
          )
          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + amount,
            totalPrice: state.totalPrice + (product.price * amount)
          }))
        } else {
          const updatedCart = [...cart, { ...product, quantity: amount }]

          set(state => ({
            cart: updatedCart,
            totalItems: state.totalItems + amount,
            totalPrice: state.totalPrice + (product.price * amount)
          }))
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)
