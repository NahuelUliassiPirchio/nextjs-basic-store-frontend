import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Search.module.css'

export default function Search () {
  const token = Cookies.get('token')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/products?name=${query}&hasBid=`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      setResults(data)
    }
    fetchData()
  }, [query])

  const onSearch = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <input type='text' placeholder='Search...' onChange={onSearch} onFocus={() => setIsSearching(true)} />
      {isSearching && (<ul className={styles.searchResults}>
        {results.length > 0 && (
          results.map(result => (
            <li key={result.id}>
              <Link href={`/${result.id}`}> {result.name} </Link>
            </li>
          ))
        )}
                       </ul>)}
    </div>
  )
}
