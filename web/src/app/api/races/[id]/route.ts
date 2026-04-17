import { NextResponse } from 'next/server'
import { getRace, getRaceResults } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid race ID'
        },
        { status: 400 }
      )
    }
    
    const race = await getRace(id)
    
    if (!race) {
      return NextResponse.json(
        {
          success: false,
          error: 'Race not found'
        },
        { status: 404 }
      )
    }
    
    const results = await getRaceResults(id)
    
    return NextResponse.json({
      success: true,
      data: {
        race,
        results
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch race'
      },
      { status: 500 }
    )
  }
}