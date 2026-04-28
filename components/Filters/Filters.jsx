import { useRef } from 'react'
import { useRouter } from 'next/router'
import styles from './Filters.module.css'
import Image from 'next/image'

export default function Filters () {
  const router = useRouter()

  const query = router.query
  const queryOrder = query?.order || 'none'
  const minPrice = query?.minPrice || ''
  const maxPrice = query?.maxPrice || ''

  const formRef = useRef(null)

  const handleCleanFilters = () => {
    const newQuery = { ...query }
    delete newQuery.order
    delete newQuery.minPrice
    delete newQuery.maxPrice

    formRef.current.reset()

    router.push({
      pathname: '/',
      query: newQuery
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const { order, minPrice, maxPrice } = Object.fromEntries(formData.entries())
    const newQuery = { ...query }
    delete newQuery.order
    delete newQuery.minPrice
    delete newQuery.maxPrice

    if (order !== 'none') newQuery.order = order

    const minPriceParsed = parseInt(minPrice)
    const maxPriceParsed = parseInt(maxPrice)

    if (isNaN(minPriceParsed) && maxPriceParsed > 0) {
      newQuery.minPrice = 1
    } else if (minPriceParsed > 0) {
      newQuery.minPrice = minPriceParsed
    }

    if (maxPriceParsed > (newQuery.minPrice || 0)) {
      newQuery.maxPrice = maxPriceParsed
    }

    router.push({
      pathname: '/',
      query: newQuery
    })
  }

  return (
    <section className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <div>
          <p className={styles.eyebrow}>Shop smarter</p>
          <h2>Filters</h2>
        </div>
        <p className={styles.helperText}>Refine the catalog by price range and sorting preference.</p>
      </div>
      <form className={styles.filtersForm} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.priceFilter}>
          <label htmlFor='minPrice'>Price range</label>
          <input
            type='number'
            id='minPrice'
            name='minPrice'
            min={0}
            placeholder='Min price'
            defaultValue={minPrice}
          />
          <span>to</span>
          <input
            type='number'
            id='maxPrice'
            name='maxPrice'
            placeholder='Max price'
            min={minPrice}
            defaultValue={maxPrice}
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
          <input className={`${styles.button} ${styles.filterButton}`} type='submit' value='Apply filters' />
          <button className={styles.cleanFiltersButton} type='button' onClick={handleCleanFilters}>
            <Image src='/icons/clear.svg' alt='Clean filters' width={25} height={25} title='Clean filters' />
            <span>Clear</span>
          </button>
        </div>
      </form>
    </section>
  )
}
