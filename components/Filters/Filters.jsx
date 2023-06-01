import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Filters.module.css'

export default function Filters () {
  const router = useRouter()

  /***
   * TODO:
   * filter by price:
   *  ☑ (max and min)
   *  ☐ (asc, desc)
   *  ☐ clean filters
   *  ☐ style
   */

  const { minPrice, maxPrice } = router.query
  const [price, setPrice] = useState({
    min: minPrice || 0,
    max: maxPrice || 0
  })

  const handleCleanFilters = () => {
    setPrice({ min: 0, max: 0 })
    router.push({
      pathname: '/',
      query: {}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = {
      ...router.query,
      minPrice: null,
      maxPrice: null
    }

    if (parseInt(price.min) > 0) query.minPrice = price.min
    if (parseInt(price.max) > parseInt(price.min)) query.maxPrice = price.max
    router.push({
      pathname: '/',
      query
    })
  }

  return (
    <section className={styles.filtersContainer}>
      <form className={styles.filtersForm} onSubmit={handleSubmit}>
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          id='min-price'
          name='min-price'
          min={0}
          defaultValue={price.min}
          onChange={(e) => setPrice({ ...price, min: e.target.value })}
        />
        <input
          type='number'
          id='max-price'
          name='max-price'
          min={price.min}
          defaultValue={price.max}
          onChange={(e) => setPrice({ ...price, max: e.target.value })}
        />
        <input type='submit' value='Filter' />
        <button type='button' onClick={handleCleanFilters}>Clear filters</button>
      </form>
    </section>
  )
}
