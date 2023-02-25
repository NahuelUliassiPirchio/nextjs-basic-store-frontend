import { useRouter } from 'next/router'
import styles from './Pagination.module.css'

export default function Pagination ({ total }) {
  const router = useRouter()
  const current = Number(router.query.page) || 1

  const handlePageChange = (page) => {
    const { pathname, query } = router
    router.push({
      pathname,
      query: { ...query, page }
    })
  }

  return (
    <div className={styles.pagination}>
      {
        Array.from({ length: total }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            className={page === current ? styles.active : styles.inactive}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))
      }
    </div>
  )
}
