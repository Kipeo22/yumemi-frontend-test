import PopulationChart from './component/PopulationChart'
import PrefectureCheckbox from './component/PrefectureCheckbox'
PopulationChart
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>タイトルです</h1>

      <PrefectureCheckbox />

      <PopulationChart />
    </main>
  )
}
