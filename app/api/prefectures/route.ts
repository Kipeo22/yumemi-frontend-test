import { NextResponse } from 'next/server'

// fetchPrefectures

export async function GET() {
  const response = await fetch(`${process.env.BASE_URL}prefectures`, {
    method: 'GET',
    headers: {
      'X-API-KEY': `${process.env.RESAS_API_KEY}`,
    },
  })

  const data = await response.json()
  return NextResponse.json(data)
}
