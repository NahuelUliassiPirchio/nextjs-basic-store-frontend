// Page that displays a single product by ID

import Product from '../components/Product/Product'

export async function getServerSideProps (context) {
  const { id } = context.query
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await res.json()
  return {
    props: {
      product
    }
  }
}

export default function ProductDisplay ({ product }) {
  return <Product product={product} />
}
