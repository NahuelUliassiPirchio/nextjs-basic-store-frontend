import Head from 'next/head'

import ProductsList from '../../components/ProductsList/ProductsList'
import endpoints from '../../common/endpoints'
import TitleWithImage from '../../components/TitleWithImage/TitleWithImage'

export async function getServerSideProps (context) {
  const { id } = context.query
  let brand = null
  let products = null

  try {
    const brandPromise = fetch(endpoints.brands.brand(id))
    const productsPromise = fetch(endpoints.products.brandProducts(id))

    await Promise.all([brandPromise, productsPromise])
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        brand = data[0]
        products = data[1]
      })
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      brand,
      products
    }
  }
}

export default function BrandDisplay ({ brand, products }) {
  if (!brand) {
    return <h1 style={{ height: '80vh' }}>Something went wrong</h1>
  }
  return (
    <>
      <Head>
        <title>{`${brand.name}`}</title>
      </Head>
      <TitleWithImage title={brand.name} image={brand.logo} />
      <ProductsList products={products.data} />
    </>
  )
}
