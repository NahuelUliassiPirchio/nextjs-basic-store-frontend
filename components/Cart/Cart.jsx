import { useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import Cookies from 'js-cookie'

import useStore from '../../hooks/useStore'
import { useCartStore } from '../../store/cartStore'
import OutsideAlerter from '../../utils/OutsideAlerter'
import { useAuth } from '../../hooks/useAuth'

import endpoints from '../../common/endpoints'
import styles from './Cart.module.css'

export default function Cart () {
  const [showCart, setShowCart] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user, isLoading } = useAuth()

  const cart = useStore(useCartStore, (state) => state.cart) || []
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  const createOrder = async () => {
    if (cart.length < 1) return
    const initialItems = cart.map(product => {
      return {
        productId: product.id,
        quantity: product.quantity
      }
    })

    setLoading(true)
    const token = Cookies.get('token')
    try {
      let res = await fetch(endpoints.orders.orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          initialItems,
          userId: user.id
        })
      })
      setLoading(false)
      if (!res.ok) throw new Error()
      res = await res.json()

      clearCart()
      alert('Order successfully created')
    } catch (error) {
      alert('There was an error creating the order')
    }
  }

  const handelPlaceOrder = async () => {
    if (isLoading) return
    if (!user) {
      setShowCart(false)
      return Router.push('/login')
    }
    await createOrder()
  }

  const handleUpdateQuantity = (e, product, amount) => {
    e.stopPropagation()

    updateQuantity(product, amount)
  }

  return (
    <OutsideAlerter callback={() => setShowCart(false)}>
      <div className={styles.cart}>
        <figure className={styles.cartButton} title='Cart' onClick={() => setShowCart(!showCart)}>
          <Image src='/icons/cart.svg' alt='Cart' width={30} height={30} />
          <span>{cart?.length}</span>
        </figure>
        {
        showCart &&
          <div className={styles.cartContainer}>
            <h2>Cart</h2>
            <ul className={styles.cartList}>
              {(cart && cart?.length > 0)
                ? cart?.map((product) => (
                  <li key={product.id} className={styles.cartItem}>
                    <Image src={product.image} alt={product.name} width={50} height={50} />
                    <h3>{product.name} - {product.brand.name}</h3>
                    <p>+${product.price}</p>
                    <div className={styles.quantityHandler}>
                      <button onClick={e => handleUpdateQuantity(e, product, +1)}>+</button>
                      <p>{product.quantity}</p>
                      {
                      product.quantity === 1
                        ? (
                          <Image src='/icons/clear.svg' alt='Remove item button' width={15} height={15} title='Remove this item from the cart' onClick={() => removeFromCart(product)} />
                          )
                        : (
                          <button onClick={e => handleUpdateQuantity(e, product, -1)}>-</button>
                          )
                    }
                    </div>
                  </li>
                ))
                : (
                  <div>This looks pretty empty</div>
                  )}
            </ul>
            <p className={styles.total}>Total: ${totalPrice}</p>
            <button className={styles.orderButton} disabled={loading} onClick={handelPlaceOrder}>{
              loading ? 'Loading...' : 'Place Order'
            }
            </button>
          </div>
      }
      </div>
    </OutsideAlerter>
  )
}
