import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CategoriesList.module.css'

export default function CategoriesList () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/categories')
      const data = await res.json()
      setCategories(data)
    }
    fetchData()
  }, [])

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
