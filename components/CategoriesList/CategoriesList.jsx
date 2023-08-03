import { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import endpoints from '../../common/endpoints'
import useFetchData from '../../hooks/useFetch'
import styles from './CategoriesList.module.css'
import OutsideAlerter from '../../utils/OutsideAlerter'

function CategoriesList () {
  const { data: categories, isLoading } = useFetchData({ url: endpoints.categories.categories, method: 'GET' })
  const [showCategories, setShowCategories] = useState(false)

  if (!categories && !isLoading) return null
  return (
    <OutsideAlerter callback={() => setShowCategories(false)}>
      <div
        className={`${styles.linkContainer} ${styles.categoriesTitle} ${showCategories && styles.active}}`}
        onClick={() => setShowCategories(!showCategories)}
      >
        Categories
        <Image src='/icons/expand-arrow.svg' alt='expand arrow' width={15} height={15} />

        {showCategories && (
          <div
            className={styles.categories}
          >
            <ul className={styles.categoriesList}>
              {
          isLoading
            ? <p>Loading...</p>
            : categories.map(category => (
              <li key={category.id}>
                <Link
                  href={
                  {
                    query: {
                      category: category.id
                    }
                  }
                } className={styles.category}
                >
                  {category.name}
                </Link>
              </li>
            ))
        }
            </ul>
          </div>
        )}
      </div>
    </OutsideAlerter>
  )
}

export default memo(CategoriesList)
