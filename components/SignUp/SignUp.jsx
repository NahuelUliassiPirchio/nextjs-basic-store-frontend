import styles from './SignUp.module.css'

export default function SignUp () {
  return (
    <div className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      <form className={styles.signUpForm}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />
        <label htmlFor='address'>Address</label>
        <input type='text' name='address' id='address' />
        <label htmlFor='phone'>Phone</label>
        <input type='tel' name='phone' id='phone' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <label htmlFor='passwordConfirmation'>Password Confirmation</label>
        <input type='password' name='passwordConfirmation' id='passwordConfirmation' />
        <button className={styles.submitButton} type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
