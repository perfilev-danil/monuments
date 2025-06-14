import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const revalidate = 86400;

export async function GET() {
  try {
    const monuments = await prisma.e24_Monument.findMany({
      include: {
        appellation_monument: true,
        year: true,
        images: true,
      },
    });

    return NextResponse.json(monuments, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятников" },
      { status: 500 }
    );
  }
}
