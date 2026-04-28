import Link from 'next/link'

import styles from './ErrorState.module.css'

export default function ErrorState ({
  title = 'Something went wrong',
  message = "It is not your fault. Our support kitty is checking what happened so you can get back to shopping soon.",
  actionLabel = 'Back to home',
  actionHref = '/'
}) {
  return (
    <section className={styles.errorState} aria-labelledby='error-state-title'>
      <div className={styles.card}>
        <div className={styles.illustration} aria-hidden='true'>
          <svg viewBox='0 0 220 180' role='img' xmlns='http://www.w3.org/2000/svg'>
            <ellipse cx='110' cy='155' rx='74' ry='12' fill='#f1f5f9' />
            <path d='M52 80c0-33 25-58 58-58s58 25 58 58v22c0 33-25 58-58 58s-58-25-58-58V80Z' fill='#f8fafc' stroke='#111827' strokeWidth='5' />
            <path d='M65 47 55 15l33 18M155 47l10-32-33 18' fill='#f8fafc' stroke='#111827' strokeWidth='5' strokeLinejoin='round' />
            <circle cx='89' cy='86' r='7' fill='#111827' />
            <circle cx='131' cy='86' r='7' fill='#111827' />
            <path d='M104 105h12l-6 7-6-7Z' fill='#f59e0b' stroke='#111827' strokeWidth='3' strokeLinejoin='round' />
            <path d='M96 124c8-9 20-9 28 0' fill='none' stroke='#111827' strokeWidth='5' strokeLinecap='round' />
            <path d='M80 111c-14-4-27-5-39-3M82 123c-13 1-25 5-36 12M140 111c14-4 27-5 39-3M138 123c13 1 25 5 36 12' stroke='#111827' strokeWidth='4' strokeLinecap='round' />
            <path d='M132 98c12 10 14 22 5 33' fill='none' stroke='#60a5fa' strokeWidth='5' strokeLinecap='round' />
            <circle cx='137' cy='135' r='5' fill='#60a5fa' />
          </svg>
        </div>
        <p className={styles.kicker}>Oops...</p>
        <h1 id='error-state-title'>{title}</h1>
        <p className={styles.message}>{message}</p>
        <Link className={styles.action} href={actionHref}>
          {actionLabel}
        </Link>
      </div>
    </section>
  )
}
