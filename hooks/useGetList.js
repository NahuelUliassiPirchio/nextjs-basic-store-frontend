import { useEffect, useState } from 'react'

export default function useGetList (url, pageNumber = 0) {
  const [list, setList] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          setError(response.statusText)
        }
      })
      .then(data => {
        setList(data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }, [url, pageNumber])

  return { list, error, isLoading }
}
