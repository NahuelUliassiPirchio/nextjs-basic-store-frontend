import styles from './ProductsList.module.css'
import ProductItem from '../ProductItem/ProductItem'

export default function ProductsList ({ products }) {
  return (
    <ul className={styles.productsList}>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  )
}
