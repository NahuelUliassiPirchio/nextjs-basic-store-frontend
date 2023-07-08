import Image from 'next/image'

import style from './TitleWithImage.module.css'

export default function TitleWithImage ({ title, image }) {
  return (
    <section className={style.container}>
      <Image className={style.image} src={image} alt={`${title}'s logo`} width={200} height={200} />
      <h1 className={style.title}>{title}</h1>
    </section>
  )
}
