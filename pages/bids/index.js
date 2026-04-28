import Head from 'next/head'
import BidsList from '../../components/BidsList/BidsList'

export default function BidsPage () {
  return (
    <>
      <Head>
        <title>BSC Store | Bids</title>
      </Head>
      <h1 style={{ margin: '30px 0 0 30px' }}>Bids</h1>
      <BidsList />
    </>
  )
}
