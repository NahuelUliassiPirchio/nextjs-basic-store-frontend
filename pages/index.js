import Head from 'next/head'
import endpoints from '../common/endpoints'
import Advertisement from '../components/Advertisement/Advertisement'
import Pagination from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'
import Filters from '../components/Filters/Filters'
import ErrorState from '../components/ErrorState/ErrorState'

const limit = 10

// Cached per server process / serverless warm instance — refetches on cold start only
let cachedMaxPrice = null

async function fetchMaxPrice () {
  try {
    const res = await fetch(`${endpoints.products.products}?limit=1&order=DESC`)
    const data = await res.json()
    const price = data.data?.[0]?.price
    if (price > 0) return Math.ceil(price / 500) * 500
  } catch {}
  return 10000
}

export async function getServerSideProps (context) {
  const { category, page, minPrice, maxPrice, order } = context.query
  const offset = (page - 1) * limit || 0
  let categoryReq = null
  let productQuery = `${endpoints.products.products}?limit=${limit}&offset=${offset}&hasBid=`
  let categoryObject = null
  if (category) {
    productQuery += `&categoryId=${category}`
    categoryReq = fetch(`${endpoints.categories.categories}/${category}`)
  }

  if (minPrice) {
    productQuery += `&minPrice=${minPrice}`
  }

  if (maxPrice) {
    productQuery += `&maxPrice=${maxPrice}`
  }

  if (order) {
    productQuery += `&order=${order}`
  }

  try {
    if (!cachedMaxPrice) cachedMaxPrice = await fetchMaxPrice()

    const productsReq = fetch(productQuery)
    const [productsRes, categoryRes] = await Promise.all([productsReq, categoryReq])
    const products = await productsRes.json()

    if (categoryRes) {
      const category = await categoryRes.json()
      categoryObject = category
    }

    return {
      props: {
        category: categoryObject,
        products,
        maxPrice: cachedMaxPrice
      }
    }
  } catch (error) {
    console.log(error) // TODO: handle error
  }

  return {
    props: {
      products: null,
      category: null,
      maxPrice: 10000
    }
  }
}

export default function Home ({ category, products, maxPrice }) {
  if (!products) {
    return <ErrorState />
  }
  return (
    <>
      <Head>
        <title>Home | BSC Store</title>
      </Head>
      <Filters maxPrice={maxPrice} />
      {category && <h1 className='title' style={{ margin: '1.5rem' }}>{category.name}</h1>}
      <ProductsList products={products.data} />
      <Pagination total={products.totalPages} />
      <Advertisement />
    </>
  )
}
