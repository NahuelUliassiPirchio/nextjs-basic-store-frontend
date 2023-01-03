import ProductsList from '../components/ProductsList/ProductsList'

const URL = process.env.STORE_API_URL

export async function getServerSideProps () {
  const res = await fetch(`${URL}/products`)
  const list = await res.json()
  return {
    props: {
      list
    }
  }
}

export default function Home ({ list }) {
  // const { list, loading } = useGetList('http://localhost:3001/products')

  return (
    <>
      <ProductsList products={list} />
      {/* {loading ? <Loading /> : <ProductsList products={list} />} */}
    </>
  )
}
