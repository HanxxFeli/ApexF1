import { NextResponse } from 'next/server'
import { getRaces } from '@/lib/db'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  count?: number
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const seasonParam = searchParams.get('season')
    
    let season: number | undefined
    if (seasonParam) {
      season = parseInt(seasonParam)
      if (isNaN(season)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid season parameter'
          },
          { status: 400 }
        )
      }
    }
    
    const races = await getRaces(season)
    
    return NextResponse.json({
      success: true,
      data: races,
      count: races.length
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch races'
      },
      { status: 500 }
    )
  }
}