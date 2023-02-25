import Head from 'next/head'
import Product from '../components/Product/Product'
import endpoints from '../common/endpoints'

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(endpoints.products.product(id))
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
