import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useAuth } from '../../hooks/useAuth'

import Countdown from '../Countdown/Countdown'
import Product from '../Product/Product'

import styles from './Bid.module.css'
import endpoints from '../../common/endpoints'

export default function Bid ({ bid }) {
  const initialDate = new Date(bid.initialDate)
  const endDate = new Date(bid.endDate)
  const { user } = useAuth()

  const bidUp = async (amount) => {
    if (!user) Router.push('/login')
    const token = Cookies.get('token')
    const response = await fetch(endpoints.bids.bidItems(bid.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bidId: bid.id,
        bidAmount: amount,
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
          <h3>Started on {initialDate.toDateString()}</h3>
          <div className={styles.countdown}>
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
  if (bidders.length === 0) return <p className={styles.noBids}>No bids yet, you can be the first!</p>
  bidders = bidders.sort((a, b) => b.bidAmount - a.bidAmount)
  return (
    <>
      <h3 className={styles.biddersTitle}>Bidders</h3>
      <button className={styles.refreshButton} onClick={handleRefresh}>Refresh</button>
      <ul className={styles.biddersList} id='bidders'>
        {
          bidders.map((bidder) => {
            const bidDate = new Date(bidder.createdAt)
            dayjs.extend(relativeTime)
            const timePassedString = dayjs(bidDate).fromNow()

            return (
              <li key={bidder.id} className={styles.bidder}>
                <p>{bidder.user.name}</p>
                <p>{timePassedString}</p>
                <p>$ {bidder.bidAmount}</p>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}
