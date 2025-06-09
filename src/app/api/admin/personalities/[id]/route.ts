import { prisma } from "../../../../../../lib/prisma"; // путь может отличаться
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const personalityId = parseInt(id);

    if (isNaN(personalityId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.e21_Personality.delete({
      where: { id: personalityId },
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
    const personalityId = parseInt(id);

    if (isNaN(personalityId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const link = formData.get("link") as string;

    const updatedPersonality = await prisma.e21_Personality.update({
      where: { id: personalityId },
      data: {
        appellation_personality: {
          update: {
            value: name,
          },
        },
        role: {
          update: {
            value: role,
          },
        },
        information_object_personality: {
          update: {
            value: link,
          },
        },
      },
      include: {
        appellation_personality: true,
        role: true,
        information_object_personality: true,
      },
    });

    return NextResponse.json(updatedPersonality, { status: 200 });
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
