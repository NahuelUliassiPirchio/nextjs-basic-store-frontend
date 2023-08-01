import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRef } from 'react'
import Loading from '../Loading/Loading'
import endpoints from '../../common/endpoints'
import styles from './ProfileInfo.module.css'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileInfo () {
  const { user } = useAuth()
  const nameRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()
  const phoneRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const email = emailRef.current.value
    const address = addressRef.current.value
    const phoneNumber = phoneRef.current.value

    const token = Cookies.get('token')
    await fetch(endpoints.profile.profile(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        email,
        address,
        phoneNumber
      })
    })
  }

  return (
    <section>
      {user
        ? (
          <div className={styles.profileInfo}>
            <Image src={'https://' + user.avatar} alt='User' width={30} height={30} />
            <form className={styles.userInfo} onSubmit={handleSubmit}>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' defaultValue={user.name} ref={nameRef} />
              <label htmlFor='email'>Email</label>
              <input type='text' name='email' defaultValue={user.email} ref={emailRef} />
              <label htmlFor='address'>Address</label>
              <input type='text' name='address' defaultValue={user.address} ref={addressRef} />
              <label htmlFor='phone'>Phone</label>
              <input type='text' name='phone' defaultValue={user.phoneNumber} ref={phoneRef} />
              <button type='submit'>Save changes</button>
            </form>
          </div>)
        : <Loading />}

    </section>
  )
}
