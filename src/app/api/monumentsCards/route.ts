import { getMonuments } from "../../../../lib/getMonuments";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getMonuments();

  return NextResponse.json(data);
}
