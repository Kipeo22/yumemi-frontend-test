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

export default function PopulationChart({ selectedPrefCodes, selectedType }) {
  // const [total, setTotal] = useState([])
  // const [young, setYoung] = useState([])
  // const [productive, setProductive] = useState([])
  // const [old, setOld] = useState([])

  const [populationData, setPopulationData] = useState([])

  // const getPopulations = async () => {
  //   const response = await axios.get('/api/population?prefCode=${prefCode}')
  //   const result = await response.data.result

  //   console.log(result)

  //   setTotal(result.data[0].data)
  //   setYoung(result.data[1].data)
  //   setProductive(result.data[2].data)
  //   setOld(result.data[3].data)
  // }

  // useEffect(() => {
  //   getPopulations()
  // }, [])

  // console.log(total)

  useEffect(() => {
    const fetchPopulations = async () => {
      const dataPromises = selectedPrefCodes.map(async (prefCode, selectedType) => {
        const response = await axios.get(`/api/population?prefCode=${prefCode}`)
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

        return { prefCode, data: result[typeIndex].data }
      })

      const populationResults = await Promise.all(dataPromises)
      setPopulationData(populationResults)
    }

    if (selectedPrefCodes.length > 0) {
      fetchPopulations()
    } else {
      setPopulationData([])
    }
  }, [selectedPrefCodes])

  //chart
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `人口構成 (${selectedType})`,
      },
    },
  }

  // const labels = total.map((label) => label.year)
  const labels = populationData[0]?.data.map((label) => label.year) || []

  // const TotalData = {
  //   labels,
  //   datasets: [
  //     {
  //       label: '総人口',
  //       data: total.map((total) => total.value),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // }

  const datasets = populationData.map((population) => ({
    label: `都道府県コード: ${population.prefCode}`,
    data: population.data.map((item) => item.value),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  }))

  const chartData = {
    labels,
    datasets,
  }

  return (
    <div>
      <h1>PopulationChart</h1>

      {/* <Line options={options} data={TotalData} /> */}
      {populationData.length > 0 ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>都道府県を選択してください</p>
      )}
    </div>
  )
}
