'use client'
import PrefectureCheckbox from './component/PrefecturesCheckbox'
import Title from './component/Title'
import './style.css'

export default function Home() {
  return (
    <main>
      <Title />
      <PrefectureCheckbox />
    </main>
  )
}
