import { NextResponse } from "next/server";
import { getDrivers } from "@/lib/api";

export async function GET() {
  try {
    const drivers = await getDrivers();

    return NextResponse.json({
      success: true,
      data: drivers,
    });
  } catch (error: any) {
    console.error("GET /api/drivers error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch drivers",
      },
      { status: 500 }
    );
  }
}