import Link from 'next/link'
import { useState } from 'react'

import { useAuth } from '../../hooks/useAuth'
import CategoriesList from '../CategoriesList/CategoriesList'
import Menu from '../Menu/Menu'
import Search from '../Search/Search'
import Cart from '../Cart/Cart'

import styles from './NavBar.module.css'
import endpoints from '../../common/endpoints'

export default function NavBar () {
  const { user, isLoading } = useAuth()

  const [showBurger, setShowBurger] = useState(false)

  return (
    <header className={styles.navbar}>
      <div className={`${styles.navIcon} ${showBurger && styles.open}`} onClick={() => setShowBurger(!showBurger)}>
        <span />
        <span />
        <span />
      </div>
      <Link className={styles.logo} passHref href='/'>
        <h1>BSC</h1>
        <h2>STORE</h2>
      </Link>
      <nav className={`${styles.links} ${showBurger && styles.display}`}>
        <Link className={styles.link} href='/' onClick={() => setShowBurger(false)}>Home</Link>
        <CategoriesList />
        <Link className={styles.link} href='/bids' onClick={() => setShowBurger(false)}>Bids</Link>
        <Link className={styles.link} href={endpoints.about} target='_blank' rel='noreferrer' onClick={() => setShowBurger(false)}>About</Link>
      </nav>
      <Search />
      <Cart />
      {user
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
          )}
    </header>
  )
}
