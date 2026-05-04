import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useState, useRef } from 'react'
import Router from 'next/router'

import { useAuth } from '../../hooks/useAuth'
import styles from './Product.module.css'
import endpoints from '../../common/endpoints'
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
  const { user } = useAuth()
  const token = Cookies.get('token')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const bidAmount = useRef()

  const isLongDesc = product.description?.length > DESCRIPTION_LIMIT
  const displayedDesc = isLongDesc && !descExpanded
    ? product.description.slice(0, DESCRIPTION_LIMIT) + '…'
    : product.description

  const handleAddToOrderClick = async () => {
    if (!user) return Router.push('/login')
    setIsLoading(true)
    setError(null)
    try {
      let order = await fetch(`${endpoints.orders.orders}?isActive=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())

      if (order.length === 0) {
        order = await fetch(endpoints.orders.orders, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ userId: user.id })
        }).then(res => res.json())
      } else {
        order = order[0]
        order.id = parseInt(order.id)
      }

      const orderItem = await fetch(endpoints.orders.allOrderItems(order.id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          orderId: order.id
        })
      }).then(res => {
        if (res.ok) return res.json()
        throw new Error('Something went wrong')
      })

      if (orderItem?.id) setAdded(true)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
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
        <div className={styles.productImage}>
          <Image src={product.image} alt={product.name} width={480} height={480} />
        </div>
        <div className={styles.productInfo}>
          {error && <p className={styles.error}>{error.message}</p>}
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
                <button
                  className={`${styles.addToOrderButton} ${added ? styles.addedToOrder : ''}`}
                  onClick={handleAddToOrderClick}
                  disabled={isLoading || added || product.stock === 0}
                >
                  {isLoading ? 'Adding…' : added ? 'Added to Order ✓' : 'Add to Order'}
                </button>
              </>
              )}
        </div>
      </div>
    </div>
  )
}
