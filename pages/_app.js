import { AuthProvider } from '../hooks/useAuth'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <div className='app-container'>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </AuthProvider>
    </>
  )
}
