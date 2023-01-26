import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { useAuth } from '../../hooks/useAuth'

import Countdown from '../Countdown/Countdown'
import Product from '../Product/Product'

import styles from './Bid.module.css'

export default function Bid ({ bid }) {
  const initialDate = new Date(bid.initialDate)
  const endDate = new Date(bid.endDate)
  const { user } = useAuth()

  const bidUp = async (amount) => {
    const token = Cookies.get('token')
    const response = await fetch(`http://localhost:3001/bids/${bid.id}/bid-items`, {
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
    if (data.statusCode === 401) Router.push('/login')
    console.log(data)
  }

  return (
    <>
      <h3>Started on {initialDate.toDateString()}</h3>
      <Product product={bid.product} bidUp={bidUp} currentPrice={bid.currentPrice} />
      {bid.isActive && (
        <section className={styles.bidInfo}>
          <div className={styles.countdown}>
            <Countdown endDate={endDate} />
          </div>
          {biddersList(bid.bidders)}
        </section>
      )}
    </>
  )
}

function biddersList (bidders) {
  if (bidders.length === 0) {
    return <p>No Bids Yet</p>
  } else {
    return bidders.map((bidder) => {
      console.log(bidder)
      const bidDate = new Date(bidder.createdAt)
      dayjs.extend(relativeTime)
      const timePassedString = dayjs(bidDate).fromNow()

      return (
        <div key={bidder.id} className={styles.bidder}>
          <p>{bidder.user.name}</p>
          <p>{timePassedString}</p>
          <p>$ {bidder.bidAmount}</p>
        </div>
      )
    })
  }
}
