import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.e5_Event.delete({
      where: { id: eventId },
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
    const eventId = parseInt(id);

    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const beginning = parseFloat(formData.get("beginning") as string);
    const end = parseFloat(formData.get("end") as string);
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;

    const updatedEvent = await prisma.e5_Event.update({
      where: { id: eventId },
      data: {
        time_span: {
          connectOrCreate: {
            where: {
              beginning_end: {
                beginning,
                end,
              },
            },
            create: {
              beginning: beginning,
              end: end,
            },
          },
        },
        appellation_event: {
          update: {
            value: name,
          },
        },
        information_object_event: {
          update: {
            value: link,
          },
        },
      },
      include: {
        appellation_event: true,
        time_span: true,
        information_object_event: true,
      },
    });

    return NextResponse.json(updatedEvent, { status: 200 });
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
