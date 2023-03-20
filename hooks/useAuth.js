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
  const [error, setError] = useState(null)

  const signin = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(URL, {
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
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })

      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong')
      }
      return data
    } catch (error) {
      setError(error)
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
    signup,
    signout,
    isLoading,
    error
  }
}
