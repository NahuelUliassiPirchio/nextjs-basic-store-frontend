import Head from 'next/head'
import BidsList from '../components/BidsList/BidsList'
import ProductsList from '../components/ProductsList/ProductsList'

const URL = process.env.STORE_API_URL

export async function getServerSideProps () {
  const productsResponse = await fetch(`${URL}/products?hasBid=`)
  const bidsResponse = await fetch(`${URL}/bids`)

  const bids = await bidsResponse.json()
  const list = await productsResponse.json()

  return {
    props: {
      list,
      bids
    }
  }
}

export default function Home ({ list, bids }) {
  // const { list, loading } = useGetList('http://localhost:3001/products')
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <ProductsList products={list} />
      <h1 className='title'>Bids</h1>
      <BidsList bids={bids} />
      {/* {loading ? <Loading /> : <ProductsList products={list} />} */}
    </>
  )
}
