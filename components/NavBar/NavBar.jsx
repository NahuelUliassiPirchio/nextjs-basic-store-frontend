import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import CategoriesList from '../CategoriesList/CategoriesList'
import Menu from '../Menu/Menu'
import Search from '../Search/Search'

import styles from './NavBar.module.css'

export default function NavBar () {
  const auth = useAuth()
  const { user } = auth

  const [showMenu, setShowMenu] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const photoClickHandler = () => {
    setShowMenu(!showMenu)
  }

  console.log(user)
  return (
    <div className={styles.navbar}>
      <Link className={styles.logo} href='/'>
        <Image
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
      </Link>
      <div className={styles.links}>
        <Link className={styles.link} href='/'>Home</Link>
        <Link className={styles.link} href='#' onClick={() => setShowCategories(!showCategories)}> Categories</Link>
        <Link className={styles.link} href='#'>About</Link>
        <Link className={styles.link} href='#'>Contact</Link>
      </div>
      {showCategories && <CategoriesList />}
      <Search />
      {auth.user
        ? (
          <div className={styles.user}>
            <Image src={'https://' + user.avatar} alt='User' width={30} height={30} onClick={photoClickHandler} draggable={false} />
            {showMenu && <Menu auth={auth} />}
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
