import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import searchIcon from '../../public/search.svg'
import styles from './Search.module.css'
import endpoints from '../../common/endpoints'

export default function Search () {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [displaySearch, setDisplaySearch] = useState(false)

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
        console.log(error) // TODO: handle error
      }
    }
    fetchData()
  }, [query])

  const onSearch = (e) => {
    setQuery(e.target.value)
  }

  const mobileSearchHandler = () => {
    setDisplaySearch(!displaySearch)
    if (!displaySearch) {
      setTimeout(() => {
        document.getElementById('search-input').focus()
      }
      , 200)
    }
  }

  const inputBlurHandler = () => {
    setTimeout(() => {
      setIsSearching(false)
      setDisplaySearch(false)
    }, 200)
  }

  return (
    <>
      <div className={`${styles.searchContainer} ${displaySearch && styles.display}`}>
        <input id='search-input' type='text' placeholder='Search...' onChange={onSearch} onFocus={() => setIsSearching(true)} onBlur={inputBlurHandler} />
        {isSearching && (
          <ul className={styles.searchResults}>
            {results?.length > 0 && (
              results.map(result => (
                <li key={result.id}>
                  <Link href={`/${result.id}`}> {result.name} </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <button className={styles.searchButton} onClick={mobileSearchHandler}>
        <Image src={searchIcon} alt='search' width={25} />
      </button>
    </>
  )
}
