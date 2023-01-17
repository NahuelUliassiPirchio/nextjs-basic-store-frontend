import { useCountdown } from '../../hooks/useCountdown'
import styles from './Countdown.module.css'

export default function Countdown ({ endDate }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate)

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownItem}>
        <p className={styles.countdownValue}>{days}</p>
        <p className={styles.countdownLabel}>Days</p>
      </div>
      <div className={styles.countdownItem}>
        <p className={styles.countdownValue}>{hours}</p>
        <p className={styles.countdownLabel}>Hours</p>
      </div>
      <div className={styles.countdownItem}>
        <p className={styles.countdownValue}>{minutes}</p>
        <p className={styles.countdownLabel}>Minutes</p>
      </div>
      <div className={styles.countdownItem}>
        <p className={styles.countdownValue}>{seconds}</p>
        <p className={styles.countdownLabel}>Seconds</p>
      </div>
    </div>
  )
}
