import Head from 'next/head'
import Bid from '../../components/Bid/Bid'

const URL = process.env.STORE_API_URL

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(`${URL}/bids/${id}`)
  const bid = await res.json()
  return {
    props: {
      bid
    }
  }
}

export default function BidDisplay ({ bid }) {
  return (
    <>
      <Head>
        <title>Hurry! {bid.product.name}</title>
      </Head>
      <Bid bid={bid} />
    </>
  )
}
