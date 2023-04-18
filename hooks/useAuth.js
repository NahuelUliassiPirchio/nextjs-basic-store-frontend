import { useState, useEffect, useContext, createContext } from 'react'
import Cookie from 'js-cookie'
import endpoints from '../common/endpoints'

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
  const [error, setError] = useState(null)

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoints.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong')
      }
      const data = await response.json()
      setUser(data)
      Cookie.set('token', data.access_token)
      return true
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
      signout()
      return false
    }
  }

  const signup = async (userInfo) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(endpoints.auth.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong')
      }

      const data = await response.json()
      setUser(data)
      Cookie.set('token', data.access_token)
      return true
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
      signout()
      return false
    }
  }

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
      fetch(endpoints.profile, {
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
    signup,
    signout,
    isLoading,
    error
  }
}
