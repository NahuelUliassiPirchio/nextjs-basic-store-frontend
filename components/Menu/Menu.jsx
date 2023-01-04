import Link from 'next/link'
import styles from './Menu.module.css'

export default function Menu ({ auth }) {
  const { signout } = auth
  const logoutClickHandler = (e) => {
    e.preventDefault()
    signout()
    window.location.reload()
  }

  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link href='/orders'>Orders </Link>
        </li>
        <li>
          <Link href='/profile'>Profile </Link>
        </li>
        <li>
          <Link href='/' onClick={logoutClickHandler}>Logout </Link>
        </li>
      </ul>
    </div>
  )
}
