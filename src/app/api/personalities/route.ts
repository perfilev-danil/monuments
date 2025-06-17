import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const personalities = await prisma.e41_Appellation_personality.findMany();
    return NextResponse.json(personalities);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}
