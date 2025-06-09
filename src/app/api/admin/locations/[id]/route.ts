import { prisma } from "../../../../../../lib/prisma"; // путь может отличаться
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const locationId = parseInt(id);

    if (isNaN(locationId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.e41_Appellation_place.delete({
      where: { id: locationId },
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
    const locationId = parseInt(id);

    if (isNaN(locationId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;

    const updatedLocation = await prisma.e41_Appellation_place.update({
      where: { id: locationId },
      data: {
        value: name,
      },
    });

    return NextResponse.json(updatedLocation, { status: 200 });
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
