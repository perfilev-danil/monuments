import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const revalidate = 86400;

export async function GET() {
  try {
    const places = await prisma.e41_Appellation_place.findMany({
      select: {
        id: true,
        value: true,
        e53_Place: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(places);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}
