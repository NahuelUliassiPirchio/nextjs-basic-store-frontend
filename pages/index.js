import Loading from '../components/Loading/Loading'
import ProductsList from '../components/ProductsList/ProductsList'
import useGetList from '../hooks/useGetList'

export default function Home () {
  const { list, loading } = useGetList('https://fakestoreapi.com/products')

  return (
    <>
      {loading ? <Loading /> : <ProductsList products={list} />}
    </>
  )
}
