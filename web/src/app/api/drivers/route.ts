import { NextResponse } from 'next/server'
import { getDrivers } from '@/lib/db'

export async function GET() {
  try {
    const drivers = await getDrivers()
    
    return NextResponse.json({
      success: true,
      data: drivers,
      count: drivers.length
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch drivers'
      },
      { status: 500 }
    )
  }
}