'use client'
import PopulationChart from './component/PopulationChart'
import PrefectureCheckbox from './component/PrefecturesCheckbox'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>タイトル</h1>
      <PrefectureCheckbox />
      <PopulationChart />
    </main>
  )
}
