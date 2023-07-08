import Cookies from 'js-cookie'
import Image from 'next/image'
import { useState } from 'react'

import styles from './OrderItem.module.css'
import endpoints from '../../common/endpoints'

export default function OrderItem ({ item }) {
  const [quantity, setQuantity] = useState(item.quantity)

  const token = Cookies.get('token')

  const handleOnDelete = async () => {
    const res = await fetch(endpoints.orders.orderItems(item.orderId, item.id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data) // TODO: handle delete and error
  }

  const increaseQuantity = async (amount) => {
    if ((quantity + amount < 1) || quantity + amount > item.product.stock) return
    const res = await fetch(endpoints.orders.orderItems(item.orderId, item.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        quantity: quantity + amount
      })
    })
    const data = await res.json()
    setQuantity(data.quantity)
  }

  return (
    <li className={styles.itemContainer}>
      <button className={styles.deleteButton} onClick={handleOnDelete}>X</button>
      <div className={styles.productContainer}>
        <Image src={item.product.image} alt={item.product.name} width={300} height={300} />
        <h3>{item.product.name}</h3>
        <p>${item.product.price}</p>
      </div>
      <div className={styles.quantityPicker}>
        <button className={styles.lessButton} onClick={() => { increaseQuantity(-1) }}>-</button>
        <span>{quantity}</span>
        <button className={styles.moreButton} onClick={() => increaseQuantity(1)}>+</button>
      </div>

      <p className={styles.itemTotal}>${item.product.price * quantity}</p>
    </li>
  )
}
