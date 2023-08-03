import { useState, useEffect } from 'react'

function useFetchData ({ url, method = 'GET', body }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!url) return
    setIsLoading(true)
    fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        setData(data)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }, [body, method, url])

  function refresh () {
    setData(null)
    setError(null)
    setIsLoading(true)
  }

  return { data, error, isLoading, refresh }
}

export default useFetchData
