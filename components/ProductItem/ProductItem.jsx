import Image from 'next/image'
import { useRouter } from 'next/router'
import style from './ProductItem.module.css'

export default function ProductItem ({ product }) {
  const router = useRouter()
  return (
    <div className={style.container} onClick={() => router.push(`/${product.id}`)}>
      <div className={style.image}>
        <Image src={product.image} alt={product.title} width={300} height={300} />
      </div>
      <div className={style.details}>
        <h3>{product.title}</h3>
        <p className={style.price}>${product.price}</p>
      </div>
    </div>
  )
}
