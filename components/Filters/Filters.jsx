import { useRef } from 'react'
import { useRouter } from 'next/router'
import styles from './Filters.module.css'
import Image from 'next/image'

export default function Filters () {
  const router = useRouter()

  const { query } = router.query
  const queryOrder = query?.order || 'none'
  const minPrice = query?.minPrice || 0
  const maxPrice = query?.maxPrice || 0

  const formRef = useRef(null)

  const handleCleanFilters = () => {
    queryOrder && delete router.query.order
    minPrice && delete router.query.minPrice
    maxPrice && delete router.query.maxPrice

    formRef.current.reset()

    router.push({
      pathname: '/',
      query
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const { order, minPrice, maxPrice } = Object.fromEntries(formData.entries())
    const newQuery = { ...query }

    if (order !== 'none') newQuery.order = order

    if (parseInt(minPrice) > 0) newQuery.minPrice = minPrice
    if (parseInt(maxPrice) > parseInt(minPrice)) newQuery.maxPrice = maxPrice
    router.push({
      pathname: '/',
      query: newQuery
    })
  }

  return (
    <section className={styles.filtersContainer}>
      <form className={styles.filtersForm} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.priceFilter}>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            name='minPrice'
            min={0}
            placeholder='Min price'
          />
          <span>to</span>
          <input
            type='number'
            id='price'
            name='maxPrice'
            placeholder='Max price'
            min={minPrice}
          />
        </div>

        <div className={styles.orderFilter}>
          <label htmlFor='order'>Order</label>
          <select
            className={`${styles.button} ${styles.filterOrderSelect}`}
            name='order'
            id='order'
            defaultValue={queryOrder}
          >
            <option value='ASC'>Ascendant</option>
            <option value='DESC'>Descendant</option>
            <option value='none'>Natural</option>
          </select>
        </div>

        <div className={styles.buttonsContainer}>
          <input className={`${styles.button} ${styles.filterButton}`} type='submit' value='Filter' />
          <button className={styles.cleanFiltersButton} type='button' onClick={handleCleanFilters}>
            <Image src='/icons/clear.svg' alt='Clean filters' width={25} height={25} title='Clean filters' />
          </button>
        </div>
      </form>
    </section>
  )
}
