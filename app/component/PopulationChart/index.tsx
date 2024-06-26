'use client'
import axios from 'axios'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  LineController,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import './style.css'

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
)

interface PopulationData {
  year: number
  value: number
}

interface PrefecturePopulation {
  prefCode: number
  prefName: string
  data: PopulationData[]
}

interface PopulationChartProps {
  selectedPrefectures: { prefCode: number; prefName: string }[]
  selectedType: string
}

export default function PopulationChart({
  selectedPrefectures,
  selectedType,
}: PopulationChartProps) {
  const [populationData, setPopulationData] = useState<PrefecturePopulation[]>([])

  useEffect(() => {
    const fetchPopulations = async () => {
      const dataPromises = selectedPrefectures.map(async (pref) => {
        const response = await axios.get(`/api/population?prefCode=${pref.prefCode}`)
        const result = response.data.result.data

        let typeIndex = 0
        switch (selectedType) {
          case '総人口':
            typeIndex = 0
            break
          case '年少人口':
            typeIndex = 1
            break
          case '生産年齢人口':
            typeIndex = 2
            break
          case '老年人口':
            typeIndex = 3
            break
        }

        return { prefCode: pref.prefCode, prefName: pref.prefName, data: result[typeIndex].data }
      })

      const populationResults = await Promise.all(dataPromises)
      setPopulationData(populationResults)
    }

    if (selectedPrefectures.length > 0) {
      fetchPopulations()
    } else {
      setPopulationData([])
    }
  }, [selectedPrefectures, selectedType])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `人口構成 (${selectedType})`,
      },
    },
  }

  const labels = populationData[0]?.data.map((label) => label.year) || []

  const datasets = populationData.map((population) => ({
    label: `${population.prefName}`,
    data: population.data.map((item) => item.value),
    borderColor: `rgb(${255 - population.prefCode * 5}, ${population.prefCode * 5}, ${255 - population.prefCode})`,
    backgroundColor: `rgba(${255 - population.prefCode * 5}, ${population.prefCode * 5}, ${255 - population.prefCode}, 0.5)`,
  }))

  const chartData = {
    labels,
    datasets,
  }

  return (
    <div className='chart-box'>
      {populationData.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>都道府県を選択してください</p>
      )}
    </div>
  )
}
