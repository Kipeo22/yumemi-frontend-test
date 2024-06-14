'use client'
import PrefectureCheckbox from './component/PrefecturesCheckbox'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>都道府県別の総人口推移</h1>
      <PrefectureCheckbox />
    </main>
  )
}
