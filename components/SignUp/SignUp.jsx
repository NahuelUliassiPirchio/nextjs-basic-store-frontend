import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './SignUp.module.css'

export default function SignUp () {
  const { signup, isLoading, error } = useAuth()
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    const { email, name, address, phone, password, passwordConfirmation } = e.target.elements

    if (!email.value || !name.value || !address.value || !phone.value || !password.value || !passwordConfirmation.value) {
      return setFormError('All fields are required')
    }
    if (password.value !== passwordConfirmation.value) {
      return setFormError('Passwords do not match')
    }

    const success = await signup({
      email: email.value,
      password: password.value,
      name: name.value,
      address: address.value,
      phoneNumber: phone.value
    })

    if (success) {
      return Router.push('/')
    }
  }

  return (
    <div className={styles.signUpContainer}>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <p className={styles.kicker}>Join BSC Store</p>
        <h1>Create your account</h1>
        <p className={styles.subtitle}>Save your details, place orders faster, and follow your bids in one place.</p>
        {(formError || error) && <p className={styles.error}>{formError || error}</p>}
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='you@example.com' autoComplete='email' />
          </div>
          <div className={styles.field}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' placeholder='Jane Doe' autoComplete='name' />
          </div>
          <div className={styles.field}>
            <label htmlFor='address'>Address</label>
            <input type='text' name='address' id='address' placeholder='123 Main St' autoComplete='street-address' />
          </div>
          <div className={styles.field}>
            <label htmlFor='phone'>Phone</label>
            <input type='tel' name='phone' id='phone' placeholder='+1 555 123 4567' autoComplete='tel' />
          </div>
          <div className={styles.field}>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' placeholder='Create a password' autoComplete='new-password' />
          </div>
          <div className={styles.field}>
            <label htmlFor='passwordConfirmation'>Confirm password</label>
            <input type='password' name='passwordConfirmation' id='passwordConfirmation' placeholder='Repeat your password' autoComplete='new-password' />
          </div>
        </div>
        <button className={styles.submitButton} type='submit' disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className={styles.switchAuth}>
          Already have an account? <Link href='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}
