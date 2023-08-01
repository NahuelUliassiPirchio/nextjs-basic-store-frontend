import Head from 'next/head'
import Bid from '../../components/Bid/Bid'
import { AuthProvider } from '../../hooks/useAuth'
import endpoints from '../../common/endpoints'

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(endpoints.bids.bid(id))
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
      <AuthProvider>
        <Bid bid={bid} />
      </AuthProvider>
    </>
  )
}
