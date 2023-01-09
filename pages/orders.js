import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Loading from '../components/Loading/Loading'
import Order from '../components/Order/Order'

export default function OrdersPage () {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders () {
      const token = Cookies.get('token')
      const res = await fetch('http://localhost:3001/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data)
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <div>
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
  )
}
