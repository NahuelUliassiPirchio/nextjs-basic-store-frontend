import Head from 'next/head'
import endpoints from '../common/endpoints'
import Advertisement from '../components/Advertisement/Advertisement'
import Pagination from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'
import Filters from '../components/Filters/Filters'

const limit = 2

export async function getServerSideProps (context) {
  const { category, page, minPrice, maxPrice } = context.query
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

  try {
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
        products
      }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      products: null,
      category: null
    }
  }
}

export default function Home ({ category, products }) {
  if (!products) {
    return <h1 style={{ height: '80vh' }}>Something went wrong</h1>
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Filters />
      {category && <h1 className='title'>{category.name}</h1>}
      <ProductsList products={products.data} />
      <Pagination total={products.totalPages} />
      <Advertisement />
    </>
  )
}
