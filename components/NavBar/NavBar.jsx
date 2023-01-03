import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'

import styles from './NavBar.module.css'

export default function NavBar () {
  const auth = useAuth()
  const { user } = auth

  const onLogOutHandler = () => {
    auth.signout()
    window.location.reload()
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </div>
      <div className={styles.links}>
        <Link className={styles.link} href='/'>Home</Link>
        <Link className={styles.link} href='#'>Products</Link>
        <Link className={styles.link} href='#'>About</Link>
        <Link className={styles.link} href='#'>Contact</Link>
      </div>
      <div className={styles.search}>
        <input type='text' placeholder='Search...' />
      </div>
      {auth.user
        ? (
          <div className={styles.user}>
            <button onClick={onLogOutHandler}>Logout</button>
            <Image src={'https://' + user.avatar} alt='User' width={30} height={30} />
            <p>{user.name}</p>
          </div>
          )
        : (
          <div className={styles.buttons}>
            <Link href='/login' className={styles.login}>Login</Link>
            <Link href='/signup' className={styles.signUp}>Sign Up</Link>
          </div>
          )}
    </div>
  )
}
