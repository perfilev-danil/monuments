import { prisma } from "../../../../../../lib/prisma"; // путь может отличаться
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const periodId = parseInt(id);

    if (isNaN(periodId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.e4_Period.delete({
      where: { id: periodId },
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
    const periodId = parseInt(id);

    if (isNaN(periodId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;

    const updatedPeriod = await prisma.e4_Period.update({
      where: { id: periodId },
      data: {
        value: name,
      },
    });

    return NextResponse.json(updatedPeriod, { status: 200 });
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
