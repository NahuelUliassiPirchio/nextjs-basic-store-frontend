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
      router.push(`/products/${product.id}`)
    }
  }

  const bidCount = bidders ? bidders.length : 0
  const actualPrice = bidders?.length > 0 ? Math.max(...bidders.map(bid => bid.bidAmount)) : product.price
  const price = bidders ? `Actual price: $${actualPrice}` : `$${product.price}`

  return (
    <div className={style.productCard} onClick={clickHandler}>
      <div className={style.imagesContainer}>
        <Image className={style.productImg} src={product.image} alt={`${product.name}'s image`} width={200} height={200} />
        <Image className={style.brandLogo} src={product.brand.logo} alt={`${product.brand.name}'s image`} width={50} height={50} title={product.brand.name} />
      </div>
      <div className={style.productInfo}>
        <div>
          <p>{product.name} - {product.brand.name}</p>
          <p>{price}</p>
        </div>
        <div className={style.bidCount}>
          <p>{bidCount} bids</p>
        </div>
        <figure>
          <Image src='./icons/add-to-cart.svg' alt='Add to cart' width={30} height={30} />
        </figure>
      </div>
    </div>
  )
}
