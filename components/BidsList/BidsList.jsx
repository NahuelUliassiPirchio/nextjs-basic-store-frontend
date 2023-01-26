import ProductItem from '../ProductItem/ProductItem'
import styles from './BidsList.module.css'
import useGetList from '../../hooks/useGetList'
import Loading from '../Loading/Loading'

const URL = 'http://localhost:3001'

const BidsList = () => {
  const { list: bids, isLoading, error } = useGetList(`${URL}/bids?`, 1)

  return (
    <ul className={styles.list}>
      {
      isLoading
        ? <Loading />
        : (
            error
              ? <p>{error}</p>
              : (
                  bids.map((bid) => (
                    <li key={bid.id} className={styles.item}>
                      <ProductItem product={bid.product} bid={bid} />
                    </li>
                  ))
                )
          )
      }
    </ul>
  )
}

export default BidsList
