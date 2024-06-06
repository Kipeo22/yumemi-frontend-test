import React, { useState, useEffect } from 'react'

const fetchPrefectures = async () => {
  const response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    method: 'GET',
    headers: {
      //   'X-API-KEY': 'f9UiPIu0VAYIUHJ7wod08FSqjw2sURRQ5XciH8bt',
      'X-API-KEY': 'f9UiPIu0VAYIUHJ7wod08FSqjw2sURRQ5XciH8bt',
    },
  })

  const data = await response.json()

  // if (data.statusCode != 200) {
  //   throw new Error(data.message)
  // }

  return data.result
}

export default fetchPrefectures
