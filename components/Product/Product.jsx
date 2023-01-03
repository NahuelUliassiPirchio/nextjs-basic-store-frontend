import Image from 'next/image'
import styles from './Product.module.css'

export default function Product ({ product }) {
  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <Image src={product.image} alt={product.name} width={300} height={300} />
      </div>
      <div className={styles.productInfo}>
        <h1>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{product.price}</p>
      </div>
    </div>
  )
}
