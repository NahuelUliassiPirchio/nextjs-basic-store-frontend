import ProductItem from '../ProductItem/ProductItem'
import useGetList from '../../hooks/useGetList'
import Loading from '../Loading/Loading'
import ErrorState from '../ErrorState/ErrorState'
import styles from './BidsList.module.css'
import endpoints from '../../common/endpoints'

const BidsList = () => {
  const { list: bids, isLoading, error } = useGetList(endpoints.bids.bids, 1)
  const isActiveBid = (bid) => bid.isActive && new Date(bid.endDate) > new Date()
  const activeBidsCount = bids.filter(isActiveBid).length
  const sortedBids = [...bids].sort((a, b) => isActiveBid(b) - isActiveBid(a))

  if (isLoading) return <Loading />

  if (error) {
    return (
      <ErrorState
        title='Load failed'
        message='It is not your fault. Our support kitty is checking the active bids and will bring them back soon.'
      />
    )
  }

  if (bids.length === 0) {
    return (
      <section className={styles.bidsSection}>
        <div className={styles.bidsHeader}>
          <p>Auctions</p>
          <h1>Bids</h1>
        </div>
        <p className={styles.emptyState}>No bids at the moment.</p>
      </section>
    )
  }

  return (
    <section className={styles.bidsSection}>
      <div className={styles.bidsHeader}>
        <p>Auctions</p>
        <h1>Bids</h1>
        <span>{activeBidsCount} live, {bids.length - activeBidsCount} finished</span>
      </div>
      <ul className={styles.bidsList}>
        {sortedBids.map((bid) => (
          <li key={bid.id} className={styles.item}>
            <ProductItem product={bid.product} bid={bid} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BidsList
