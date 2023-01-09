import OrderItem from '../OrderItem/OrderItem'
import Loading from '../Loading/Loading'

import styles from './Order.module.css'

export default function Order ({ order }) {
  return (
    <div>
      {order
        ? (
          <div className={styles.orderContainer}>
            <h2>Order {order.id}</h2>
            <ul>
              {order.orderItems.map(item => {
                item.orderId = order.id
                return <OrderItem key={item.id} item={item} />
              }
              )}
            </ul>
          </div>
          )
        : (
          <Loading />
          )}
    </div>
  )
}
