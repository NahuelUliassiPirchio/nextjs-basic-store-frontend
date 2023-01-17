import Image from 'next/image'
import { useRouter } from 'next/router'
import style from './ProductItem.module.css'

export default function ProductItem ({ product, bid }) {
  const router = useRouter()
  const bidders = bid ? bid.bidders : undefined
  const clickHandler = () => {
    if (bidders) {
      router.push(`/bids/${bid.id}`)
    } else {
      router.push(`/${product.id}`)
    }
  }

  const bidCount = bidders ? bidders.length : 0
  const actualPrice = bidders ? Math.max(...bidders.map(bid => bid.bidAmount)) : undefined
  const price = bidders ? `Actual price: $${actualPrice}` : `$${product.price}`

  return (
    <div className={style.container} onClick={clickHandler}>
      <div className={style.image}>
        <Image src={product.image} alt={product.name} width={300} height={300} />
      </div>
      <div className={style.details}>
        <h3>{product.name}</h3>
        {bidders && (
          <>
            <p className={style.bids}>Bids: {bidCount}</p>
            <p className={style.price}>Initial price: ${product.price}</p>
          </>
        )}
        <p className={style.price}>{price}</p>
      </div>
    </div>
  )
}
