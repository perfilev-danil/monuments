import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const places = await prisma.e53_Place.findMany({
      include: {
        appellation_place: true,
        appellation_address: {
          include: {
            coordinates: true,
          },
        },
      },
    });

    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const lat = parseFloat(formData.get("lat") as string);
    const lon = parseFloat(formData.get("lon") as string);

    const newPersonality = await prisma.e53_Place.create({
      data: {
        appellation_place: {
          connectOrCreate: {
            where: {
              value: location,
            },
            create: {
              value: location,
            },
          },
        },
        appellation_address: {
          create: {
            value: address,
            coordinates: {
              create: {
                lat: lat,
                lon: lon,
              },
            },
          },
        },
      },
      include: {
        appellation_place: true,
        appellation_address: {
          include: {
            coordinates: true,
          },
        },
      },
    });

    return NextResponse.json(newPersonality, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании:", error);
    return NextResponse.json(
      {
        error: "Не удалось создать",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
