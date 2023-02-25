import Router from 'next/router'
import { useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'

export default function Login () {
  const { signin, loading, error } = useAuth()
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
        <h1>Login</h1>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' ref={emailRef} />
        <label htmlFor='password'>Password</label>
        <input type='password' htmlFor='password' name='password' id='password' ref={passwordRef} />
        <button className={styles.submitButton} type='submit'>Login</button>
      </form>
    </div>
  )
}
