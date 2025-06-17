import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const techniques = await prisma.e55_Technique.findMany();
    return NextResponse.json(techniques);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}
