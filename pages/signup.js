import Link from 'next/link'
import SignUp from '../components/SignUp/SignUp'

export default function SignUpPage () {
  return (
    <>
      <SignUp />
      <p style={{ marginLeft: '1rem' }}>Do you already have an account? <Link href='/login'><u>Login</u></Link></p>
    </>
  )
}
