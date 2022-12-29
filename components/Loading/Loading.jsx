import style from './Loading.module.css'

export default function Loading () {
  return (
    <div className={style.loading}>
      <div className={style.loading__spinner} />
    </div>
  )
}
