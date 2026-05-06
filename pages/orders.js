import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'

import Loading from '../components/Loading/Loading'
import Order from '../components/Order/Order'
import endpoints from '../common/endpoints'
import styles from '../styles/Orders.module.css'

export default function OrdersPage () {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    async function fetchOrders () {
      const token = Cookies.get('token')
      const res = await fetch(`${endpoints.orders.orders}?order=DESC`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <>
      <Head>
        <title>Orders | BSC Store</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>My Orders</h1>
        {orders === null
          ? <Loading />
          : orders.length === 0
            ? <p className={styles.empty}>No orders yet</p>
            : (
              <ul className={styles.list}>
                {orders.map(order => (
                  <li key={order.id}>
                    <Order order={order} />
                  </li>
                ))}
              </ul>
              )}
      </div>
    </>
  )
}
