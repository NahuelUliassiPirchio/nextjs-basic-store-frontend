import styles from './Login.module.css'

export default function Login () {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h1>Login</h1>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input htmlFor='password' name='password' id='password' />
        <button className={styles.submitButton} type='submit'>Login</button>
      </form>
    </div>
  )
}
