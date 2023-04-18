import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Search.module.css'
import endpoints from '../../common/endpoints'

export default function Search () {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 1) {
        return
      }
      try {
        const res = await fetch(`${endpoints.products.products}?name=${query}&hasBid=`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const fetchedData = await res.json()
        setResults(fetchedData.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [query])

  const onSearch = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className={styles.searchContainer}>
      <input type='text' placeholder='Search...' onChange={onSearch} onFocus={() => setIsSearching(true)} onBlur={() => setTimeout(() => setIsSearching(false), 200)} />
      {isSearching && (
        <ul className={styles.searchResults}>
          {results.length > 0 && (
            results.map(result => (
              <li key={result.id}>
                <Link onClick={() => console.log('sale')} href={`/${result.id}`}> {result.name} </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
