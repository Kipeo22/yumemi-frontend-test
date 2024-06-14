import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const prefCode = searchParams.get('prefCode')

  const response = await fetch(
    `${process.env.BASE_URL}population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': `${process.env.RESAS_API_KEY}`,
      },
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
