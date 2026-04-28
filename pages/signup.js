import Head from 'next/head'
import SignUp from '../components/SignUp/SignUp'
import { AuthProvider } from '../hooks/useAuth'

export default function SignUpPage () {
  return (
    <>
      <Head>
        <title>BSC Store | Sign Up</title>
      </Head>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </>
  )
}
