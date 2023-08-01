import Head from 'next/head'
import Product from '../../components/Product/Product'
import endpoints from '../../common/endpoints'
import { AuthProvider } from '../../hooks/useAuth'

export async function getServerSideProps (context) {
  const { id } = context.query
  let product = null
  try {
    const res = await fetch(endpoints.products.product(id))
    if (res.status === 404 || res.status === 500 || res.status === 400) {
      return {
        props: {
          product: null
        }
      }
    }
    product = await res.json()
  } catch (error) {
  }
  return {
    props: {
      product
    }
  }
}

export default function ProductDisplay ({ product }) {
  if (!product) {
    return <h1 style={{ height: '80vh' }}>Something went wrong</h1>
  }
  return (
    <>
      <Head>
        <title>{`${product.name}`}</title>
      </Head>
      <AuthProvider>
        <Product product={product} />
      </AuthProvider>
    </>
  )
}
