import Cookies from 'js-cookie'
import Image from 'next/image'
import { useState } from 'react'

import styles from './OrderItem.module.css'
import endpoints from '../../common/endpoints'
import { formatPrice } from '../../utils/formatters'

export default function OrderItem ({ item }) {
  const [quantity, setQuantity] = useState(item.quantity)
  const token = Cookies.get('token')

  const handleOnDelete = async () => {
    await fetch(endpoints.orders.orderItems(item.orderId, item.id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }

  const increaseQuantity = async (amount) => {
    if ((quantity + amount < 1) || quantity + amount > item.product.stock) return
    const res = await fetch(endpoints.orders.orderItems(item.orderId, item.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: quantity + amount })
    })
    const data = await res.json()
    setQuantity(data.quantity)
  }

  return (
    <li className={styles.itemRow}>
      <Image
        className={styles.itemImg}
        src={item.product.image}
        alt={item.product.name}
        width={60}
        height={60}
      />
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{item.product.name}</p>
        <p className={styles.itemUnitPrice}>${formatPrice(item.product.price)} each</p>
      </div>
      <div className={styles.quantityPicker}>
        <button onClick={() => increaseQuantity(-1)}>−</button>
        <span>{quantity}</span>
        <button onClick={() => increaseQuantity(1)}>+</button>
      </div>
      <p className={styles.itemTotal}>${formatPrice(item.product.price * quantity)}</p>
      <button className={styles.deleteButton} onClick={handleOnDelete} title='Remove item'>×</button>
    </li>
  )
}
