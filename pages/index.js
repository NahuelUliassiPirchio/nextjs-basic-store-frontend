import Footer from '../components/Footer/Footer'
import NavBar from '../components/NavBar/NavBar'
import ProductItem from '../components/ProductItem/ProductItem'

export default function Home () {
  const fakeProduct = {
    name: 'Product Name',
    description: 'Product Description',
    price: 100,
    image: 'https://imgs.search.brave.com/UTPvPCZFENSgqFTTSOBQrgU637V6L12tL8CJGjVNqCY/rs:fit:900:900:1/g:ce/aHR0cHM6Ly9pbnNw/Z3IuaWQvYXBwL3Vw/bG9hZHMvMjAxNS8w/My9wcm9kdWN0LWRl/c2lnbi1rb3ppb2wt/MDcuanBn'
  }

  return (
    <>
      <NavBar />
      <ProductItem product={fakeProduct} />
      <Footer />
    </>
  )
}
