// app/api/test-monuments/route.ts
import { NextResponse } from "next/server";
import { getMonumentsFiltered } from "../../../../lib/getMonumentsFiltered";

export async function GET() {
  const data = await getMonumentsFiltered({
    periodId: [],
    materialId: [],
    colorId: [],
    techniqueId: [],
    markId: [],
    placeId: [],
    personId: [],
    search: "",
  });
  return NextResponse.json(data);
}
