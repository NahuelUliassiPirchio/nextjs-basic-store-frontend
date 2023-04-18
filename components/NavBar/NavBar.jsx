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
  const [showCategories, setShowCategories] = useState(false)

  const photoClickHandler = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} href='/'>
        <h1>BSC</h1>
        <h2>STORE</h2>
      </Link>
      <div className={styles.links}>
        <Link className={styles.link} href='/'>Home</Link>
        <Link className={`${styles.link} ${styles.categories}`} href='#' onMouseEnter={() => setShowCategories(true)}>
          Categories
          {showCategories && <CategoriesList setShowCategories={setShowCategories} />}
        </Link>
        <Link className={styles.link} href='/bids'>Bids</Link>
        <Link className={styles.link} href={endpoints.about} target='_blank' rel='noreferrer'>About</Link>
      </div>
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
          <div className={styles.buttons}>
            <Link href='/login' className={styles.login}>Login</Link>
            <Link href='/signup' className={styles.signUp}>Sign Up</Link>
          </div>
          )}
    </div>
  )
}
