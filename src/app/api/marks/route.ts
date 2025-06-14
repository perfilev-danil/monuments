import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const revalidate = 86400;

export async function GET() {
  try {
    const marks = await prisma.e37_Mark.findMany();
    return NextResponse.json(marks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении символов" },
      { status: 500 }
    );
  }
}
