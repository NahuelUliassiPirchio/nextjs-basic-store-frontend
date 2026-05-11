import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'

import { useImageZoom } from '../../hooks/useImageZoom'
import { useCartStore } from '../../store/cartStore'
import styles from './Product.module.css'
import { formatPrice } from '../../utils/formatters'

const DESCRIPTION_LIMIT = 150

function StockIndicator ({ stock }) {
  if (stock === 0) {
    return <span className={`${styles.stock} ${styles.stockOut}`}>Out of stock</span>
  }
  if (stock <= 5) {
    return <span className={`${styles.stock} ${styles.stockLow}`}>Only {stock} left</span>
  }
  return <span className={`${styles.stock} ${styles.stockIn}`}>In stock ({stock} units)</span>
}

export default function Product ({ product, bidUp, currentPrice }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [descExpanded, setDescExpanded] = useState(false)
  const bidAmount = useRef()
  const { isZoomed, containerProps, overlayRef } = useImageZoom()

  const isLongDesc = product.description?.length > DESCRIPTION_LIMIT
  const displayedDesc = isLongDesc && !descExpanded
    ? product.description.slice(0, DESCRIPTION_LIMIT) + '…'
    : product.description

  const maxQuantity = product.stock > 0 ? product.stock : 0

  const handleAddToCart = () => {
    updateQuantity(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.productContainer}>
      {!bidUp && (
        <nav className={styles.breadcrumb} aria-label='breadcrumb'>
          <Link href='/'>Home</Link>
          <span>/</span>
          <Link href={`/brands/${product.brand.id}`}>{product.brand.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
      )}
      <div className={styles.productMain}>
        <div className={styles.productImage} {...containerProps}>
          <Image src={product.image} alt={product.name} width={480} height={480} />
          <div
            ref={overlayRef}
            className={`${styles.zoomOverlay}${isZoomed ? ` ${styles.zoomOverlayActive}` : ''}`}
            style={{ backgroundImage: `url(${product.image})` }}
            aria-hidden="true"
          />
        </div>
        <div className={styles.productInfo}>
          {!bidUp && (
            <Link href={`/brands/${product.brand.id}`} className={styles.brandRow}>
              <Image
                src={product.brand.logo}
                alt={product.brand.name}
                width={36}
                height={36}
                className={styles.brandLogo}
              />
              <span className={styles.brandName}>{product.brand.name}</span>
            </Link>
          )}
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>
            {displayedDesc}
            {isLongDesc && (
              <button
                className={styles.descToggle}
                onClick={() => setDescExpanded(e => !e)}
              >
                {descExpanded ? ' Ver menos' : ' Ver más'}
              </button>
            )}
          </p>
          {bidUp
            ? (
              <div className={styles.bidPanel}>
                <div className={styles.currentBid}>
                  <span>Current bid</span>
                  <strong>${formatPrice(currentPrice)}</strong>
                </div>
                <div className={styles.bidUp}>
                  <button onClick={() => bidUp(currentPrice + 1)}>Bid Up $1</button>
                  <button onClick={() => bidUp(currentPrice + 5)}>Bid Up $5</button>
                  <button onClick={() => bidUp(currentPrice + 10)}>Bid Up $10</button>
                </div>
                <div className={styles.customBid}>
                  <label htmlFor='customBid'>Custom bid</label>
                  <input id='customBid' type='number' ref={bidAmount} defaultValue={currentPrice + 1} min={currentPrice + 1} />
                  <button onClick={() => bidUp(bidAmount.current.value)}>Bid Up</button>
                </div>
              </div>
              )
            : (
              <>
                <p className={styles.price}>${formatPrice(product.price)}</p>
                {product.stock !== undefined && <StockIndicator stock={product.stock} />}
                <div className={styles.addToCartRow}>
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || product.stock === 0}
                    >−</button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                      disabled={quantity >= maxQuantity || product.stock === 0}
                    >+</button>
                  </div>
                  <button
                    className={`${styles.addToCartButton} ${added ? styles.addedToCart : ''}`}
                    onClick={handleAddToCart}
                    disabled={added || product.stock === 0}
                  >
                    {added ? 'Added ✓' : 'Add to cart'}
                  </button>
                </div>
              </>
              )}
        </div>
      </div>
    </div>
  )
}
