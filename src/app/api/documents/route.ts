import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.e31_Document.findMany();

    return NextResponse.json(documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}
