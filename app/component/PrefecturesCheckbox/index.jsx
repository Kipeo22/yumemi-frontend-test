import React, { useEffect, useState } from 'react'
import fetchPrefectures from '@/api/prefectures'

export default function PrefectureCheckbox() {
  const [prefecture, setPrefecture] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    fetchPrefectures()
      .then((data) => setPrefecture(data))
      .catch((error) => setError(error.message))
  }, [])

  // if (error) {
  //   console.log(`${error}, エラーです`)
  // }
  console.log(prefecture)

  return (
    <div>
      <h2>都道府県名</h2>
      <ul>
        {prefecture.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <input type='checkbox' value={prefecture.prefCode} />
            {prefecture.prefName}
          </li>
        ))}
      </ul>
    </div>
  )
}
