import Link from 'next/link'
import endpoints from '../../common/endpoints'
import useFetchData from '../../hooks/useFetch'
import styles from './CategoriesList.module.css'

export default function CategoriesList ({ setShowCategories }) {
  const { data: categories, isLoading } = useFetchData({ url: endpoints.categories.categories, method: 'GET' })

  if (!categories) return null
  return (
    <div
      className={styles.categories}
      onMouseLeave={() => setShowCategories(false)}
      onMouseEnter={() => setShowCategories(true)}
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
  )
}
