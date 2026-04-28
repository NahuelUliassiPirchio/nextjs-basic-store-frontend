import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import style from './ProductItem.module.css'

import { formatPrice } from '../../utils/formatters'
import { useCartStore } from '../../store/cartStore'
import useStore from '../../hooks/useStore'

export default function ProductItem ({ product, bid }) {
  const router = useRouter()
  const { addToCart, removeFromCart } = useCartStore()
  const cart = useStore(useCartStore, (state) => state.cart) || []

  const bidders = bid && bid.bidders
  const isExpiredBid = bid && (!bid.isActive || new Date(bid.endDate) <= new Date())
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
  const price = bidders ? `Actual price: $${formatPrice(actualPrice)}` : `$${formatPrice(product.price)}`
  const endDate = bid
    ? new Date(bid.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    : null

  return (
    <div className={`${style.productCard} ${bid ? style.bidCard : ''} ${isExpiredBid ? style.expiredBidCard : ''}`} onClick={clickHandler}>
      <div className={style.imagesContainer}>
        <Image className={style.productImg} src={product.image} alt={`${product.name}'s image`} width={200} height={200} />
        {isExpiredBid && <span className={style.expiredRibbon}>Finished</span>}
        {
          !bid && (<Link href={`/brands/${product.brand.id}`} passHref onClick={e => e.stopPropagation()}>
            <Image className={style.brandLogo} src={product.brand.logo} alt={`${product.brand.name}'s image`} width={50} height={50} title={product.brand.name} />
          </Link>)
        }
      </div>
      <div className={style.productInfo}>
        <div>
          <p>{product.name} - {!bid && product.brand.name}</p>
          <p>{price}</p>
        </div>
        {
          bidders && (
            <div className={style.bidInfo}>
              <span className={style.bidBadge}>{isExpiredBid ? 'Finished' : 'Live bid'}</span>
              <p>{bidCount} {bidCount === 1 ? 'bid' : 'bids'}</p>
              <p>{isExpiredBid ? 'Ended' : 'Ends'} {endDate}</p>
            </div>
          )
        }
        {
          !bid && (
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
          )
        }
      </div>
    </div>
  )
}
