import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const revalidate = 86400;

export async function GET() {
  try {
    const materials = await prisma.e57_Material.findMany();

    return NextResponse.json(materials);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении материалов" },
      { status: 500 }
    );
  }
}
