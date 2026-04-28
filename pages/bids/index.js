import Head from 'next/head'
import BidsList from '../../components/BidsList/BidsList'

export default function BidsPage () {
  return (
    <>
      <Head>
        <title>BSC Store | Bids</title>
      </Head>
      <BidsList />
    </>
  )
}
