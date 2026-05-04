import OrderItem from '../OrderItem/OrderItem'
import Loading from '../Loading/Loading'
import { formatPrice } from '../../utils/formatters'
import styles from './Order.module.css'

export default function Order ({ order }) {
  if (!order) return <Loading />

  const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = order.orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderTitle}>
          <h2>Order <span>#{order.id}</span></h2>
          {order.isActive !== undefined && (
            <span className={`${styles.badge} ${order.isActive ? styles.badgeActive : styles.badgeClosed}`}>
              {order.isActive ? 'Active' : 'Completed'}
            </span>
          )}
        </div>
      </div>

      <ul className={styles.itemsList}>
        {order.orderItems.map(item => {
          item.orderId = order.id
          return <OrderItem key={item.id} item={item} />
        })}
      </ul>

      <div className={styles.orderSummary}>
        <span className={styles.summaryCount}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
        <span className={styles.summaryTotal}>
          Total: <strong>${formatPrice(totalPrice)}</strong>
        </span>
      </div>
    </div>
  )
}
