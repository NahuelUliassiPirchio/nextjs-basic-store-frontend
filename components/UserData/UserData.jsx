import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import styles from '../NavBar/NavBar.module.css'
import Menu from '../Menu/Menu'

export default function UserData () {
  const { user, isLoading } = useAuth()

  return (
    <>
      {
        user
          ? (
              !isLoading && (
                <Menu userAvatar={user.avatar} />
              )
            )
          : (
            <div className={styles.signButtons}>
              <Link href='/login' className={styles.login}>Login</Link>
              <Link href='/signup' className={styles.signUp}>Sign Up</Link>
            </div>
            )
        }
    </>
  )
}
