import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useAuth } from '../../hooks/useAuth'

import Countdown from '../Countdown/Countdown'
import Product from '../Product/Product'

import styles from './Bid.module.css'
import endpoints from '../../common/endpoints'
import { formatPrice } from '../../utils/formatters'

dayjs.extend(relativeTime)

export default function Bid ({ bid }) {
  const initialDate = new Date(bid.initialDate)
  const endDate = new Date(bid.endDate)
  const { user } = useAuth()

  const bidUp = async (amount) => {
    if (!user) return Router.push('/login')
    const token = Cookies.get('token')
    const response = await fetch(endpoints.bids.bidItems(bid.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bidId: bid.id,
        bidAmount: Number(amount),
        userId: user.id
      })
    })
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    }
    Router.reload()
  }
  return (
    <>
      <Product product={bid.product} bidUp={bidUp} currentPrice={bid.currentPrice} />
      {bid.isActive && (
        <section className={styles.bidInfo}>
          <div className={styles.bidSummary}>
            <div>
              <p className={styles.eyebrow}>Live auction</p>
              <h2>Bid details</h2>
              <p className={styles.startedAt}>Started on {initialDate.toDateString()}</p>
            </div>
            <div className={styles.bidStats}>
              <span>Active</span>
              <strong>{bid.bidders.length}</strong>
              <small>{bid.bidders.length === 1 ? 'bid placed' : 'bids placed'}</small>
            </div>
          </div>
          <div className={styles.countdownCard}>
            <p>Ends in</p>
            <Countdown endDate={endDate} />
          </div>
          {biddersList(bid.bidders)}
        </section>
      )}
    </>
  )
}

function handleRefresh () {
  Router.reload()
}

function biddersList (bidders) {
  if (bidders.length === 0) {
    return (
      <div className={styles.biddersPanel}>
        <p className={styles.noBids}>No bids yet, you can be the first!</p>
      </div>
    )
  }

  const sortedBidders = [...bidders].sort((a, b) => b.bidAmount - a.bidAmount)
  return (
    <div className={styles.biddersPanel}>
      <div className={styles.biddersHeader}>
        <div>
          <p className={styles.eyebrow}>Activity</p>
          <h3 className={styles.biddersTitle}>Bidders</h3>
        </div>
        <button className={styles.refreshButton} onClick={handleRefresh}>Refresh</button>
      </div>
      <ul className={styles.biddersList} id='bidders'>
        {
          sortedBidders.map((bidder, index) => {
            const bidDate = new Date(bidder.createdAt)
            const timePassedString = dayjs(bidDate).fromNow()
            const bidderName = bidder.user?.name || 'Anonymous bidder'

            return (
              <li key={bidder.id} className={styles.bidder}>
                <div className={styles.bidderIdentity}>
                  <span>{bidderName.charAt(0).toUpperCase()}</span>
                  <div>
                    <p>{bidderName}</p>
                    <small>{timePassedString}</small>
                  </div>
                </div>
                {index === 0 && <span className={styles.leadingBadge}>Leading</span>}
                <p className={styles.bidAmount}>$ {formatPrice(bidder.bidAmount)}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
