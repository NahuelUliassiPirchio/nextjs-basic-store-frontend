import Link from 'next/link'
import useFetchData from '../../hooks/useFetch'
import styles from './CategoriesList.module.css'

export default function CategoriesList () {
  const { data: categories, isLoading } = useFetchData({ url: 'http://localhost:3001/categories', method: 'GET' })

  if (isLoading) return <p>Loading...</p>
  if (!categories) return null
  return (
    <div className={styles.categories}>
      <ul className={styles.categoriesList}>
        {categories.map(category => (
          <li key={category.id}>
            <Link href={`/?category=${category.id}`} className={styles.category}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
