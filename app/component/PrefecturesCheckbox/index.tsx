'use client'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import PopulationChart from '../PopulationChart'
import './style.css'

interface Prefecture {
  prefCode: number
  prefName: string
}

interface SelectedPrefecture {
  prefCode: number
  prefName: string
}

export default function PrefectureCheckbox() {
  const [prefectures, setPrefecture] = useState<Prefecture[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<SelectedPrefecture[]>([])
  const [selectedType, setSelectedType] = useState<string>('総人口')

  const getPrefectures = async () => {
    const response = await axios.get('/api/prefectures')
    const data = await response.data
    setPrefecture(data.result)
  }

  useEffect(() => {
    getPrefectures()
  }, [])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const prefCode = parseInt(event.target.value)
    const prefName = event.target.name

    setSelectedPrefectures((prevSelected) =>
      event.target.checked
        ? [...prevSelected, { prefCode, prefName }]
        : prevSelected.filter((pref) => pref.prefCode !== prefCode),
    )
  }

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value)
  }

  return (
    <>
      <div className='PrefSelect'>
        <h2>都道府県名</h2>
        <ul className='box-container'>
          {prefectures.map((prefecture) => (
            <li key={prefecture.prefCode} className='checkbox'>
              <input
                type='checkbox'
                value={prefecture.prefCode}
                name={prefecture.prefName}
                onChange={handleCheckboxChange}
              />
              {prefecture.prefName}
            </li>
          ))}
        </ul>
      </div>

      <div className='typeSelect'>
        <h2>表示する人口構成タイプ</h2>
        <label className='select-box'>
          <select id='populationType' value={selectedType} onChange={handleTypeChange}>
            <option value='総人口'>総人口</option>
            <option value='年少人口'>年少人口</option>
            <option value='生産年齢人口'>生産年齢人口</option>
            <option value='老年人口'>老年人口</option>
          </select>
        </label>
      </div>

      <PopulationChart selectedPrefectures={selectedPrefectures} selectedType={selectedType} />
    </>
  )
}
