'use client'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

export default function PopulationChart() {
  const [total, setTotal] = useState([])
  const [young, setYoung] = useState([])
  const [productive, setProductive] = useState([])
  const [old, setOld] = useState([])

  const getPopulations = async () => {
    const response = await axios.get('/api/population')
    const result = await response.data.result

    setTotal(result.data[0].data)
    setYoung(result.data[1].data)
    setProductive(result.data[2].data)
    setOld(result.data[3].data)
  }

  useEffect(() => {
    getPopulations()
  }, [])

  console.log(total)
  return (
    <div>
      <h1>PopulationChart</h1>
      {/* <ul>
        {total.map((total) => (
          <li key={total.year}>
            {total.year} : {total.value}
          </li>
        ))}
      </ul> */}
    </div>
  )
}
