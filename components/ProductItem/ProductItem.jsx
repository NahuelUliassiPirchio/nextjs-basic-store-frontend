import Image from 'next/image'
import style from './ProductItem.module.css'

export default function ProductItem ({ product }) {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <Image src={product.image} alt={product.name} width={300} height={300} />
      </div>
      <div className={style.details}>
        <h3>{product.name}</h3>
        <p className={style.description}>{product.description}</p>
        <p className={style.price}>${product.price}</p>
      </div>
    </div>
  )
}
