import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

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

    /*
    const result = places.map((place) => ({
      id: place.id,
      placeId: place.e53_Place?.id,
      value: place.value || "Без названия",
    }));*/

    return NextResponse.json(places);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}
