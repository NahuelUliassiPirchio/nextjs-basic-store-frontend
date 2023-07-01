import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

import { useAuth } from '../../hooks/useAuth'
import styles from './Menu.module.css'
import OutsideAlerter from '../../utils/OutsideAlerter'

export default function Menu ({ userAvatar }) {
  const auth = useAuth()
  const { signout } = auth
  const logoutClickHandler = (e) => {
    e.preventDefault()
    signout()
    window.location.reload()
  }

  const [showMenu, setShowMenu] = useState(false)

  return (
    <OutsideAlerter callback={() => showMenu && setShowMenu(false)}>
      <div className={styles.user} onClick={() => setShowMenu(!showMenu)}>
        <Image src={'https://' + userAvatar} alt='User Profile' title='User Profile' width={30} height={30} draggable={false} />
      </div>

      {
        showMenu && (
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
    </OutsideAlerter>
  )
}
