import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const monuments = await prisma.e24_Monument.findMany({
      include: {
        appellation_monument: true,
        year: true,
        images: {
          take: 1,
          orderBy: {
            id: "asc",
          },
        },
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
