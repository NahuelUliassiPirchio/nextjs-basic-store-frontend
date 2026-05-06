import Head from 'next/head'
import Product from '../../components/Product/Product'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts'
import endpoints from '../../common/endpoints'
import { AuthProvider } from '../../hooks/useAuth'
import ErrorState from '../../components/ErrorState/ErrorState'

export async function getServerSideProps (context) {
  const { id } = context.query
  let product = null
  let relatedProducts = []

  try {
    const res = await fetch(endpoints.products.product(id))
    if (res.status === 404 || res.status === 500 || res.status === 400) {
      return { props: { product: null, relatedProducts: [] } }
    }
    product = await res.json()
  } catch (error) {
    return { props: { product: null, relatedProducts: [] } }
  }

  const categoryId = product?.categories?.[0]?.id ?? product?.category?.id
  if (categoryId) {
    try {
      const relatedRes = await fetch(
        `${endpoints.products.products}?categoryId=${categoryId}&limit=7`
      )
      if (relatedRes.ok) {
        const data = await relatedRes.json()
        const all = Array.isArray(data) ? data : (data.data ?? [])
        relatedProducts = all.filter(p => p.id !== product.id).slice(0, 6)
      }
    } catch (_) {}
  }

  return { props: { product, relatedProducts } }
}

export default function ProductDisplay ({ product, relatedProducts }) {
  if (!product) {
    return (
      <ErrorState
        title='We could not find this product'
        message='It is not your fault. Our support kitty is searching for this product and checking what happened.'
      />
    )
  }
  return (
    <>
      <Head>
        <title>{`${product.name} | BSC Store`}</title>
      </Head>
      <AuthProvider>
        <Product product={product} />
        <RelatedProducts products={relatedProducts} />
      </AuthProvider>
    </>
  )
}
