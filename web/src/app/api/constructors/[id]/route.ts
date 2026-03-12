import { NextResponse } from 'next/server'
import { getConstructor } from '@/src/lib/db'

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
          error: 'Invalid constructor ID'
        },
        { status: 400 }
      )
    }
    
    const constructor = await getConstructor(id)
    
    if (!constructor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Constructor not found'
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: constructor
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch constructor'
      },
      { status: 500 }
    )
  }
}