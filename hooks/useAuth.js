import { useState, useEffect, useContext, createContext } from 'react'
import Cookie from 'js-cookie'

const URL = 'http://localhost:3001/auth/login'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useAuthProvider () {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const signin = (email, password) => fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(res => {
      setUser(res)
      Cookie.set('token', res.access_token)
      return res
    }
    )
    .finally(() => setIsLoading(false))

  const signout = () => {
    return new Promise(resolve => {
      setUser(false)
      Cookie.remove('token')
      resolve()
    })
  }

  useEffect(() => {
    const token = Cookie.get('token')
    if (token) {
      fetch('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            return signout()
          }
          return res.json()
        })
        .then(res => setUser(res))
        .finally(() => setIsLoading(false))
    } else {
      setUser(false)
      setIsLoading(false)
    }
  }, [])

  return {
    user,
    signin,
    signout,
    isLoading
  }
}
