import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const events = await prisma.e5_Event.findMany({
      include: {
        appellation_event: true,
        time_span: true,
        information_object_event: true,
      },
    });

    return NextResponse.json(events, { status: 200 });
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

    const beginning = parseFloat(formData.get("beginning") as string);
    const end = parseFloat(formData.get("end") as string);
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;

    const newEvent = await prisma.e5_Event.create({
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
          create: {
            value: name,
          },
        },
        information_object_event: {
          create: {
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

    return NextResponse.json(newEvent, { status: 201 });
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
