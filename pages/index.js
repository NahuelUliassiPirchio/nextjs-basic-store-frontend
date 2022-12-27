import Footer from '../components/Footer/Footer'
import Loading from '../components/Loading/Loading'
import NavBar from '../components/NavBar/NavBar'
import ProductsList from '../components/ProductsList/ProductsList'
import useGetList from '../hooks/useGetList'

export default function Home () {
  const { list, loading } = useGetList('https://fakestoreapi.com/products')

  return (
    <>
      <NavBar />
      {loading ? <Loading /> : <ProductsList products={list} />}
      <Footer />
    </>
  )
}
