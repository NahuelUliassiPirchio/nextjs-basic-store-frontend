import ProductItem from '../ProductItem/ProductItem'
import useGetList from '../../hooks/useGetList'
import Loading from '../Loading/Loading'
import ErrorState from '../ErrorState/ErrorState'
import styles from './BidsList.module.css'
import endpoints from '../../common/endpoints'

const BidsList = () => {
  const { list: bids, isLoading, error } = useGetList(`${endpoints.bids.bids}?isActive=true`, 1)

  if (isLoading) return <Loading />

  if (error) {
    return (
      <ErrorState
        title='Load failed'
        message='It is not your fault. Our support kitty is checking the active bids and will bring them back soon.'
      />
    )
  }

  if (bids.length === 0) return <h1>No active bids at the moment</h1>

  return (
    <ul className={styles.bidsList}>
      {bids.map((bid) => (
        <li key={bid.id} className={styles.item}>
          <ProductItem product={bid.product} bid={bid} />
        </li>
      ))}
    </ul>
  )
}

export default BidsList
