import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h3>Company</h3>
        <ul>
          <li><Link href='https://uliassipirchio.me/projects/basic-store' passHref target='_blank' rel='noreferrer'>About us</Link></li>
          <li><Link href='https://uliassipirchio.me#contact' passHref target='_blank' rel='noreferrer'>Contact us</Link></li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h3>Follow us</h3>
        <ul>
          <li><Link href='https://linkedin.com/in/uliassipirchio' passHref target='_blank' rel='noreferrer'>LinkedIn</Link></li>
          <li><Link href='https://github.com/nahueluliassipirchio' passHref target='_blank' rel='noreferrer'>Github</Link></li>
          <li><Link href='https://uliassipirchio.me' passHref target='_blank' rel='noreferrer'>Portfolio</Link></li>
        </ul>
      </div>
    </footer>
  )
}
