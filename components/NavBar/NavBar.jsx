import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import CategoriesList from '../CategoriesList/CategoriesList'
import Menu from '../Menu/Menu'
import Search from '../Search/Search'

import styles from './NavBar.module.css'
import endpoints from '../../common/endpoints'

export default function NavBar () {
  const { user, isLoading } = useAuth()

  const [showMenu, setShowMenu] = useState(false)
  const [showBurger, setShowBurger] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const photoClickHandler = () => {
    setShowMenu(!showMenu)
  }

  return (
    <header className={styles.navbar}>
      <div className={`${styles.navIcon} ${showBurger && styles.open}`} onClick={() => setShowBurger(!showBurger)}>
        <span />
        <span />
        <span />
      </div>
      <Link className={styles.logo} href='/'>
        <h1>BSC</h1>
        <h2>STORE</h2>
      </Link>
      <nav className={`${styles.links} ${showBurger && styles.display}`}>
        <Link className={styles.link} href='/' onClick={() => setShowBurger(false)}>Home</Link>
        <div
          className={`${styles.link} ${styles.categories} ${showCategories && styles.active}}`}
          onClick={() => setShowCategories(!showCategories)}
        >
          Categories
          <Image src='/icons/expand-arrow.svg' alt='expand arrow' width={15} height={15} />
          {showCategories && <CategoriesList setShowCategories={setShowCategories} />}
        </div>
        <Link className={styles.link} href='/bids' onClick={() => setShowBurger(false)}>Bids</Link>
        <Link className={styles.link} href={endpoints.about} target='_blank' rel='noreferrer' onClick={() => setShowBurger(false)}>About</Link>
      </nav>
      <Search />
      {user
        ? (
            !isLoading && (
              <div className={styles.user}>
                <Image src={'https://' + user.avatar} alt='User' width={30} height={30} onClick={photoClickHandler} draggable={false} />
                {showMenu && <Menu />}
              </div>
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
