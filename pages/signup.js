import Link from 'next/link'
import SignUp from '../components/SignUp/SignUp'
import { AuthProvider } from '../hooks/useAuth'

export default function SignUpPage () {
  return (
    <>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
      <p style={{ marginLeft: '1rem' }}>Do you already have an account? <Link href='/login'><u>Login</u></Link></p>
    </>
  )
}
