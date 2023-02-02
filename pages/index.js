import Head from 'next/head'
import Pagination from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'

const URL = process.env.STORE_API_URL
const limit = 2

export async function getServerSideProps (context) {
  const { category, page } = context.query
  const offset = page || 1
  let productQuery = ''

  let categoryObject = null
  if (category) {
    const categoryResponse = await fetch(`${URL}/categories/${category}`)
    productQuery = `${URL}/products?category=${category}&limit=${limit}&offset=${offset}`
    categoryObject = await categoryResponse.json()
  } else {
    productQuery = `${URL}/products?offset=${offset}&limit=${limit}`
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
      <Pagination current={products.currentPage} total={products.totalPages} />
    </>
  )
}
