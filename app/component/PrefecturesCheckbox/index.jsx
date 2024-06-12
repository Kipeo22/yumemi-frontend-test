'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PopulationChart from '../PopulationChart'

export default function PrefectureCheckbox() {
  const [prefectures, setPrefecture] = useState([])
  const [selectedPrefCodes, setSelectedPrefCodes] = useState([])
  const [selectedType, setSelectedType] = useState('総人口')

  const getPrefectures = async () => {
    const response = await axios.get('/api/prefectures')
    const data = await response.data

    setPrefecture(data.result)
  }

  // getPrefectures()
  useEffect(() => {
    getPrefectures()
  }, [])

  // console.log(prefectures)

  const handleCheckboxChange = (event) => {
    const prefCode = event.target.value
    setSelectedPrefCodes((prevSelected) =>
      event.target.checked
        ? [...prevSelected, prefCode]
        : prevSelected.filter((code) => code !== prefCode),
    )
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value)
  }

  return (
    <div>
      <h2>都道府県名</h2>
      <ul>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode}>
            <input type='checkbox' value={prefecture.prefCode} onChange={handleCheckboxChange} />
            {prefecture.prefName}
          </li>
        ))}
      </ul>

      <label htmlFor='populationType'>人口構成タイプ: </label>
      <select id='populationType' value={selectedType} onChange={handleTypeChange}>
        <option value='総人口'>総人口</option>
        <option value='年少人口'>年少人口</option>
        <option value='生産年齢人口'>生産年齢人口</option>
        <option value='老年人口'>老年人口</option>
      </select>

      <PopulationChart selectedPrefCodes={selectedPrefCodes} selectedType={selectedType} />
    </div>
  )
}
