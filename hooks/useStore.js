import { useState, useEffect } from 'react'

export default function useStore (
  store,
  callback
) {
  const result = store(callback)
  const [data, setData] = useState()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
