import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './SignUp.module.css'

export default function SignUp () {
  const { signup, error } = useAuth()
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

  useEffect(() => {
    if (error) {
      setFormError(error)
    }
  }, [error])

  return (
    <div className={styles.signUpContainer}>
      <h1>Sign Up</h1>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
        {formError && <p className={styles.error}>{formError}</p>}
        <button className={styles.submitButton} type='submit'>Sign Up</button>
      </form>
    </div>
  )
}
