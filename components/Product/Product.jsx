import Image from 'next/image'
import styles from './Product.module.css'

export default function Product ({ product }) {
  return (
    <div className={styles.productContainer}>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <div className={styles.productInfo}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{product.price}</p>
      </div>
    </div>
  )
}
