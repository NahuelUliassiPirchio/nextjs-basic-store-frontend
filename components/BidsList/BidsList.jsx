import ProductItem from '../ProductItem/ProductItem'
import useGetList from '../../hooks/useGetList'
import Loading from '../Loading/Loading'
import styles from './BidsList.module.css'
import endpoints from '../../common/endpoints'

const BidsList = () => {
  const { list: bids, isLoading, error } = useGetList(`${endpoints.bids.bids}?isActive=true`, 1)

  return (
    <ul className={styles.bidsList}>
      {
      isLoading
        ? <Loading />
        : (
            error
              ? <p>{error.message}</p>
              : (
                  bids.length > 0
                    ? (
                        bids.map((bid) => (
                          <li key={bid.id} className={styles.item}>
                            <ProductItem product={bid.product} bid={bid} />
                          </li>
                        ))
                      )
                    : (
                      <h1>No active bids at the moment</h1>
                      )
                )
          )
      }
    </ul>
  )
}

export default BidsList
