import Head from 'next/head'
import ProductsList from '../components/ProductsList/ProductsList'

const URL = process.env.STORE_API_URL

export async function getServerSideProps (context) {
  const { category } = context.query

  let categoryObject = null
  if (category) {
    const categoryResponse = await fetch(`${URL}/categories/${category}`)
    categoryObject = await categoryResponse.json()
  }

  return {
    props: {
      category: categoryObject
    }
  }
}

export default function Home ({ category }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {category && <h1 className='title'>{category.name}</h1>}
      <ProductsList category={category} />
    </>
  )
}
