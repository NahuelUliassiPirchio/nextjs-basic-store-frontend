import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Loading from '../components/Loading/Loading'
import Order from '../components/Order/Order'
import endpoints from '../common/endpoints'
import Head from 'next/head'

export default function OrdersPage () {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders () {
      const token = Cookies.get('token')
      const res = await fetch(`${endpoints.orders.orders}?order=DESC`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div style={{ minHeight: '70vh' }}>
        <h1>Orders</h1>
        {orders
          ? (orders.length > 0
              ? (
                <ul>
                  {orders.map(order => (
                    <li key={order.id}>
                      <Order order={order} />
                    </li>
                  ))}
                </ul>
                )
              : (
                <p>No orders yet</p>
                ))
          : (
            <Loading />
            )}
      </div>
    </>
  )
}
