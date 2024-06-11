'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PrefectureCheckbox() {
  const [prefectures, setPrefecture] = useState([])

  const getPrefectures = async () => {
    const response = await axios.get('/api/prefectures')
    const data = await response.data

    setPrefecture(data.result)
  }

  // getPrefectures()
  useEffect(() => {
    getPrefectures()
  }, [])

  console.log(prefectures)

  return (
    <div>
      <h2>都道府県名</h2>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <input type='checkbox' value={prefecture.prefCode} />
            {prefecture.prefName}
          </li>
        ))}
      </ul>
    </div>
  )
}
