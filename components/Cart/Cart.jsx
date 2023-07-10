import { useState } from 'react'
import Image from 'next/image'
import useStore from '../../hooks/useStore'
import { useCartStore } from '../../store/cartStore'

export default function Cart () {
  const [showCart, setShowCart] = useState(false)

  const cart = useStore(useCartStore, (state) => state.cart)
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const handleUpdateQuantity = (e, product, amount) => {
    e.stopPropagation()

    updateQuantity(product, amount)
  }

  return (
    <>
      <Image src='/icons/cart.svg' alt='Cart' width={50} height={50} onClick={() => setShowCart(!showCart)} />
      <span>{cart?.length}</span>
      {
        showCart &&
          <div>
            <h1>Cart</h1>
            <ul>
              {cart?.map((product) => (
                <li key={product.id}>
                  <Image src={product.image} alt={product.name} width={100} height={100} />
                  <h3>{product.name} - {product.brand.name}</h3>
                  <p>+${product.price}</p>
                  <button onClick={e => handleUpdateQuantity(e, product, -1)}>-</button>
                  <p>{product.quantity}</p>
                  <button onClick={e => handleUpdateQuantity(e, product, +1)}>+</button>
                  <button onClick={() => removeFromCart(product)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total: ${totalPrice}</p>
          </div>
}
    </>
  )
}
