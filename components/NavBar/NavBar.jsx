import Image from 'next/image'
import Link from 'next/link'
import styles from './NavBar.module.css'

export default function NavBar () {
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
      <div className={styles.buttons}>
        <Link href='/login' className={styles.login}>Login</Link>
        <Link href='/signup' className={styles.signUp}>Sign Up</Link>
      </div>
    </div>
  )
}
