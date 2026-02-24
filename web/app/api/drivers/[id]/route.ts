import { NextResponse } from "next/server";
import { getDriver } from "@/src/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid driver ID",
        },
        { status: 400 },
      );
    }

    const driver = await getDriver(id);

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          error: "Driver not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: driver,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch driver",
      },
      { status: 500 },
    );
  }
}
