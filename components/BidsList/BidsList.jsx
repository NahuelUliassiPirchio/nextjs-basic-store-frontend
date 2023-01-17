import ProductItem from '../ProductItem/ProductItem'
import styles from './BidsList.module.css'

const BidsList = ({ bids }) => {
  return (
    <ul className={styles.list}>
      {bids.map((bid) => (
        <li key={bid.id} className={styles.item}>
          <ProductItem product={bid.product} bid={bid} />
        </li>
      ))}
    </ul>
  )
}

export default BidsList
