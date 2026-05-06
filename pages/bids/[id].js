import Head from 'next/head'
import Bid from '../../components/Bid/Bid'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts'
import { AuthProvider } from '../../hooks/useAuth'
import endpoints from '../../common/endpoints'

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(endpoints.bids.bid(id))
  const bid = await res.json()

  let relatedProducts = []
  try {
    const productRes = await fetch(endpoints.products.product(bid.product.id))
    if (productRes.ok) {
      const fullProduct = await productRes.json()
      const categoryId = fullProduct?.categories?.[0]?.id ?? fullProduct?.category?.id
      if (categoryId) {
        const relatedRes = await fetch(
          `${endpoints.products.products}?categoryId=${categoryId}&limit=7`
        )
        if (relatedRes.ok) {
          const data = await relatedRes.json()
          const all = Array.isArray(data) ? data : (data.data ?? [])
          relatedProducts = all.filter(p => p.id !== bid.product.id).slice(0, 6)
        }
      }
    }
  } catch (_) {}

  return {
    props: {
      bid,
      relatedProducts
    }
  }
}

export default function BidDisplay ({ bid, relatedProducts }) {
  return (
    <>
      <Head>
        <title>{`Bid: ${bid.product.name} | BSC Store`}</title>
      </Head>
      <AuthProvider>
        <Bid bid={bid} />
        <RelatedProducts products={relatedProducts} />
      </AuthProvider>
    </>
  )
}
