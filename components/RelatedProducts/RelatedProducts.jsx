import ProductItem from '../ProductItem/ProductItem'
import styles from './RelatedProducts.module.css'

export default function RelatedProducts ({ products }) {
  if (!products || products.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Related Products</h2>
      <div className={styles.scrollRow}>
        {products.map(product => (
          <div key={product.id} className={styles.item}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
