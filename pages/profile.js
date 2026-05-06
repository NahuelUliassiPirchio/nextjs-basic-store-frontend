import Head from 'next/head'
import { AuthProvider } from '../hooks/useAuth'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'

export default function Profile () {
  return (
    <>
      <Head>
        <title>Profile | BSC Store</title>
      </Head>
      <AuthProvider>
        <ProfileInfo />
      </AuthProvider>
    </>
  )
}
