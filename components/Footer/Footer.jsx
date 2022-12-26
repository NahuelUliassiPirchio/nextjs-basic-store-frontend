import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <div className={styles.footer}>
      <Link href='/'>Footer</Link>
    </div>
  )
}
