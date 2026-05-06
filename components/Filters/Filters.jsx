import { useState } from 'react'
import { useRouter } from 'next/router'
import * as Slider from '@radix-ui/react-slider'
import styles from './Filters.module.css'
import Image from 'next/image'

const MIN_PRICE = 0

export default function Filters ({ maxPrice = 10000 }) {
  const router = useRouter()

  const query = router.query
  const initialMin = parseInt(query?.minPrice) || MIN_PRICE
  const initialMax = parseInt(query?.maxPrice) || maxPrice

  const [priceRange, setPriceRange] = useState([initialMin, initialMax])
  const [order, setOrder] = useState(query?.order || 'none')

  const handleCleanFilters = () => {
    setPriceRange([MIN_PRICE, maxPrice])
    setOrder('none')

    const newQuery = { ...query }
    delete newQuery.order
    delete newQuery.minPrice
    delete newQuery.maxPrice

    router.push({ pathname: '/', query: newQuery })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newQuery = { ...query }
    delete newQuery.order
    delete newQuery.minPrice
    delete newQuery.maxPrice

    if (order !== 'none') newQuery.order = order

    if (priceRange[0] > MIN_PRICE || priceRange[1] < maxPrice) {
      newQuery.minPrice = priceRange[0]
      newQuery.maxPrice = priceRange[1]
    }

    router.push({ pathname: '/', query: newQuery })
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
      <form className={styles.filtersForm} onSubmit={handleSubmit}>
        <div className={styles.priceFilter}>
          <div className={styles.priceFilterHeader}>
            <label>Price range</label>
            <div className={styles.priceValues}>
              <span>${priceRange[0].toLocaleString()}</span>
              <span>—</span>
              <span>${priceRange[1].toLocaleString()}{priceRange[1] === maxPrice ? '+' : ''}</span>
            </div>
          </div>
          <Slider.Root
            className={styles.sliderRoot}
            min={MIN_PRICE}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            minStepsBetweenThumbs={1}
          >
            <Slider.Track className={styles.sliderTrack}>
              <Slider.Range className={styles.sliderRange} />
            </Slider.Track>
            <Slider.Thumb className={styles.sliderThumb} aria-label='Minimum price' />
            <Slider.Thumb className={styles.sliderThumb} aria-label='Maximum price' />
          </Slider.Root>
        </div>

        <div className={styles.orderFilter}>
          <label htmlFor='order'>Order</label>
          <select
            className={`${styles.button} ${styles.filterOrderSelect}`}
            name='order'
            id='order'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
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
