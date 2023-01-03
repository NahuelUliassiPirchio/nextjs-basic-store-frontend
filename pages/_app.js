import { AuthProvider } from '../hooks/useAuth'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  )
}
