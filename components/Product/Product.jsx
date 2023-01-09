import Image from 'next/image'
import styles from './Product.module.css'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function Product ({ product }) {
  const token = Cookies.get('token')
  const [buttonText, setButtonText] = useState('Add to Order')

  const handleAddToOrderClick = async () => {
    let order = await fetch('http://localhost:3001/orders?isActive=true', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())

    if (order.length === 0) {
      order = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    } else {
      order = order[0]
      order.id = parseInt(order.id)
    }

    const orderItem = await fetch(`http://localhost:3001/orders/${order.id}/order-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1,
        orderId: order.id
      })
    }).then(res => res.json())

    console.log(orderItem)

    if (orderItem) {
      setButtonText('Added to Order!')
      alert('Product added to order!')
    }
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <Image src={product.image} alt={product.name} width={300} height={300} />
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <button className={styles.addToOrderButton} onClick={handleAddToOrderClick}>{buttonText}</button>
      </div>
    </div>
  )
}
