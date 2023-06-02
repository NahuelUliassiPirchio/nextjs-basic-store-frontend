import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './Filters.module.css'

export default function Filters () {
  const router = useRouter()

  /***
   * TODO:
   * filter by price:
   *  ☑ (max and min)
   *  ☑ (asc, desc) readonly order: 'ASC' | 'DESC';
   *  ☑ clean filters
   *  ☐ style
   */

  const { query } = router.query
  const queryOrder = query?.order
  const minPrice = query?.minPrice
  const maxPrice = query?.maxPrice

  const [price, setPrice] = useState({
    min: minPrice || 0,
    max: maxPrice || 0
  })
  const [order, setOrder] = useState(queryOrder || 'none')

  const handleCleanFilters = () => {
    queryOrder && delete router.query.order
    minPrice && delete router.query.minPrice
    maxPrice && delete router.query.maxPrice

    router.push({
      pathname: '/',
      query
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newQuery = { ...query }

    if (order !== 'none') newQuery.order = order

    if (parseInt(price.min) > 0) query.minPrice = price.min
    if (parseInt(price.max) > parseInt(price.min)) query.maxPrice = price.max
    router.push({
      pathname: '/',
      query: newQuery
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
        <select
          name='order'
          id='order'
          onChange={e => setOrder(e.target.value)}
          defaultValue={order}
        >
          <option value='ASC'>Ascendant</option>
          <option value='DESC'>Descendant</option>
          <option value='none'>Natural</option>
        </select>
        <input type='submit' value='Filter' />
        <button type='button' onClick={handleCleanFilters}>Clear filters</button>
      </form>
    </section>
  )
}
