import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductsList.module.css'

export default function ProductsList ({ products }) {
  return (
    <ul className={styles.productsList}>
      {
        products?.map(product =>
          <li key={product.id} className={styles.productItem}>
            <ProductItem key={product.id} product={product} />
          </li>
        )
      }
    </ul>
  )
}
