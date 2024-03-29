import ProductItem from '../ProductItem/ProductItem'
import styles from './ProductsList.module.css'

export default function ProductsList ({ products }) {
  if (!products) return null
  if (products.length === 0) return <h1>No products found</h1>
  return (
    <section className={styles.productsListContainer}>
      <ul className={styles.productsList}>
        {
        products?.map(product =>
          <li key={product.id} className={styles.productItem}>
            <ProductItem key={product.id} product={product} />
          </li>
        )
      }
      </ul>
    </section>
  )
}
