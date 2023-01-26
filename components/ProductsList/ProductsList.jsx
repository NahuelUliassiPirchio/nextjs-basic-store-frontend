import Loading from '../Loading/Loading'
import ProductItem from '../ProductItem/ProductItem'
import useGetList from '../../hooks/useGetList'
import styles from './ProductsList.module.css'

const URL = 'http://localhost:3001'

export default function ProductsList ({ category }) {
  const { list: products, isLoading, error } = useGetList(category ? `${URL}/products?category=${category.id}?` : `${URL}/products?`)

  return (
    <ul className={styles.productsList}>
      {
        isLoading
          ? <Loading />
          : (
              error
                ? <p>{error}</p>
                : (
                    products.map(product =>
                      <li key={product.id} className={styles.productItem}>
                        <ProductItem key={product.id} product={product} />
                      </li>
                    )
                  )
            )
      }
    </ul>
  )
}
