import { getMonuments } from "../../../../lib/getMonuments";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getMonuments();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
