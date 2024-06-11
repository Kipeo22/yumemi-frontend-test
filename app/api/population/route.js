import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': 'f9UiPIu0VAYIUHJ7wod08FSqjw2sURRQ5XciH8bt',
      },
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
