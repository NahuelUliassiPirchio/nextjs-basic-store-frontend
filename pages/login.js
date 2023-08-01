
import Head from 'next/head'
import Login from '../components/Login/Login'
import { AuthProvider } from '../hooks/useAuth'

export default function LoginPage () {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </>
  )
}
