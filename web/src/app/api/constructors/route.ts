import { NextResponse } from 'next/server'
import { getConstructors } from '@/lib/db'

export async function GET() {
  try {
    const constructors = await getConstructors()
    
    return NextResponse.json({
      success: true,
      data: constructors,
      count: constructors.length
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch constructors'
      },
      { status: 500 }
    )
  }
}