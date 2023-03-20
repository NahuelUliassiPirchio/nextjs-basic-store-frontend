import Head from 'next/head'
import endpoints from '../common/endpoints'
import Advertisement from '../components/Advertisement/Advertisement'
import Pagination from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'

const limit = 2

export async function getServerSideProps (context) {
  const { category, page } = context.query
  const offset = (page - 1) * limit || 0
  let productQuery = ''

  let categoryObject = null
  if (category) {
    const categoryResponse = await fetch(endpoints.categories.category(category))
    productQuery = `${endpoints.products.products}?categoryId=${category}&limit=${limit}&offset=${offset}&hasBid=`
    categoryObject = await categoryResponse.json()
  } else {
    productQuery = `${endpoints.products.products}?offset=${offset}&limit=${limit}&hasBid=`
  }
  try {
    const productsResponse = await fetch(productQuery)
    const products = await productsResponse.json()
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
      {category && <h1 className='title'>{category.name}</h1>}
      <ProductsList products={products.data} />
      <Pagination total={products.totalPages} />
      <Advertisement />
    </>
  )
}
