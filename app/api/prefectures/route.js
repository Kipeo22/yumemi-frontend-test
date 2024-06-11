import { NextResponse } from 'next/server'

// fetchPrefectures

export async function GET() {
  const response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    method: 'GET',
    headers: {
      //   'X-API-KEY': 'f9UiPIu0VAYIUHJ7wod08FSqjw2sURRQ5XciH8bt',
      'X-API-KEY': 'f9UiPIu0VAYIUHJ7wod08FSqjw2sURRQ5XciH8bt',
    },
  })

  const data = await response.json()
  return NextResponse.json(data)
}
