import Head from 'next/head'
import BidsList from '../components/BidsList/BidsList'
import ProductsList from '../components/ProductsList/ProductsList'

const URL = process.env.STORE_API_URL

export async function getServerSideProps (context) {
  let productsFetchUrl = `${URL}/products?hasBid=`
  const { category } = context.query
  if (category) {
    productsFetchUrl = `${URL}/products?categoryId=${category}&hasBid=`
  }
  const categoryResponse = await fetch(`${URL}/categories/${category}`)
  const productsResponse = await fetch(productsFetchUrl)
  const bidsResponse = await fetch(`${URL}/bids`)

  const categoryObject = await categoryResponse.json()
  const bids = await bidsResponse.json()
  const list = await productsResponse.json()

  return {
    props: {
      list,
      bids,
      category: categoryObject
    }
  }
}

export default function Home ({ list, bids, category }) {
  // const { list, loading } = useGetList('http://localhost:3001/products')
  console.log(category)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {category && <h1 className='title'>{category.name}</h1>}
      <ProductsList products={list} />
      <h1 className='title'>Bids</h1>
      <BidsList bids={bids} />
      {/* {loading ? <Loading /> : <ProductsList products={list} />} */}
    </>
  )
}
