import Router from 'next/router'
import Link from 'next/link'
import { useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'

export default function Login () {
  const { signin, isLoading, error } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value

    const success = await signin(email, password)
    if (success) {
      Router.push('/')
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <p className={styles.kicker}>Welcome back</p>
        <h1>Login to your account</h1>
        <p className={styles.subtitle}>Pick up where you left off and keep exploring the store.</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' ref={emailRef} placeholder='you@example.com' autoComplete='email' required />
        </div>
        <div className={styles.field}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' ref={passwordRef} placeholder='Your password' autoComplete='current-password' required />
        </div>
        <button className={styles.submitButton} type='submit' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className={styles.switchAuth}>
          New here? <Link href='/signup'>Create an account</Link>
        </p>
      </form>
    </div>
  )
}
