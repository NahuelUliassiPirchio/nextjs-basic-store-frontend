import { useEffect, useState } from 'react'

export default function useGetList (URL) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(URL)
        const list = await res.json()
        setList(list)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [])

  return { list, loading, error }
}
