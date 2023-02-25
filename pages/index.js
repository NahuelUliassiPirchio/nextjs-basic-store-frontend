import Head from 'next/head'
import endpoints from '../common/endpoints'
import Pagination from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'

const limit = 2

export async function getServerSideProps (context) {
  const { category, page } = context.query
  const offset = page || 1
  let productQuery = ''

  let categoryObject = null
  if (category) {
    const categoryResponse = await fetch(endpoints.categories.category(category))
    productQuery = `${endpoints.products.products()}?category=${category}&limit=${limit}&offset=${offset}`
    categoryObject = await categoryResponse.json()
  } else {
    productQuery = `${endpoints.products.products()}?offset=${offset}&limit=${limit}`
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
    return {
      props: {
        category: null,
        products: null
      }
    }
  }
}

export default function Home ({ category, products }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {category && <h1 className='title'>{category.name}</h1>}
      <ProductsList products={products.data} />
      <Pagination total={products.totalPages} />
    </>
  )
}
