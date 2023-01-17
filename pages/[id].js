import Head from 'next/head'
import Product from '../components/Product/Product'

const URL = process.env.STORE_API_URL

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(`${URL}/products/${id}`)
  const product = await res.json()
  return {
    props: {
      product
    }
  }
}

export default function ProductDisplay ({ product }) {
  return (
    <>
      <Head>
        {/* TODO: add brand */}
        <title>{`${product.name}`}</title>
      </Head>
      <Product product={product} />
    </>
  )
}
