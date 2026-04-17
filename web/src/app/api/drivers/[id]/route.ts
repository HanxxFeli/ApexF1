import { NextResponse } from "next/server";
import { getDriver } from "@/lib/api";

/**
 * GET /api/drivers/[id]
 *
 * Fetches one driver from the external API using the driver ID
 * from the route param and returns it as JSON.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const driver = await getDriver(id);

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          error: "Driver not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: driver,
    });
  } catch (error: any) {
    console.error("GET /api/drivers/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch driver",
      },
      { status: 500 }
    );
  }
}