import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import style from './ProductItem.module.css'

import { useCartStore } from '../../store/cartStore'
import useStore from '../../hooks/useStore'

export default function ProductItem ({ product, bid }) {
  const router = useRouter()
  const { addToCart, removeFromCart } = useCartStore()
  const cart = useStore(useCartStore, (state) => state.cart) || []

  const bidders = bid && bid.bidders
  const clickHandler = () => {
    if (bidders) {
      router.push(`/bids/${bid.id}`)
    } else {
      router.push(`/products/${product.id}`)
    }
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (cart.find(item => item.id === product.id)) { removeFromCart(product) } else { addToCart(product) }
  }

  const bidCount = bidders ? bidders.length : 0
  const actualPrice = bidders?.length > 0 ? Math.max(...bidders.map(bid => bid.bidAmount)) : product.price
  const price = bidders ? `Actual price: $${actualPrice}` : `$${product.price}`

  return (
    <div className={style.productCard} onClick={clickHandler}>
      <div className={style.imagesContainer}>
        <Image className={style.productImg} src={product.image} alt={`${product.name}'s image`} width={200} height={200} />
        <Link href={`/brands/${product.brand.id}`} passHref onClick={e => e.stopPropagation()}>
          <Image className={style.brandLogo} src={product.brand.logo} alt={`${product.brand.name}'s image`} width={50} height={50} title={product.brand.name} />
        </Link>
      </div>
      <div className={style.productInfo}>
        <div>
          <p>{product.name} - {product.brand.name}</p>
          <p>{price}</p>
        </div>
        {
          bidders && (
            <div className={style.bidInfo}>
              <p>{bidCount} bids</p>
              <p>Ends in {bid.endDate}</p>
            </div>
          )
        }
        <figure>
          {
            cart.find(item => item.id === product.id)
              ? (
                <Image src='/icons/added-to-cart.svg' alt='Remove from cart' width={50} height={50} onClick={handleAddToCart} title='Remove From Cart' />
                )
              : (
                <Image src='/icons/add-to-cart.svg' alt='Add to cart' width={50} height={50} onClick={handleAddToCart} title='Add To Cart' />
                )
          }
        </figure>
      </div>
    </div>
  )
}
