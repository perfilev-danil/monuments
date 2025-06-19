import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const placeId = parseInt(id);

    if (isNaN(placeId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.e53_Place.delete({
      where: { id: placeId },
    });

    return NextResponse.json({ message: "Удалено" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    return NextResponse.json(
      {
        error: "Не удалось удалить",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const placeId = parseInt(id);

    if (isNaN(placeId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const location = formData.get("location") as string;
    const address = formData.get("address") as string;
    const lat = parseFloat(formData.get("lat") as string);
    const lon = parseFloat(formData.get("lon") as string);

    const updatedPlace = await prisma.e53_Place.update({
      where: { id: placeId },
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
          update: {
            value: address,
            coordinates: {
              update: {
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

    return NextResponse.json(updatedPlace, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
    return NextResponse.json(
      {
        error: "Не удалось обновить",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
