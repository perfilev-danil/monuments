import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const personalities = await prisma.e21_Personality.findMany({
      include: {
        role: true,
        appellation_personality: true,
        information_object_personality: true,
      },
    });

    return NextResponse.json(personalities, { status: 200 });
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

    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const link = formData.get("link") as string;

    const newPersonality = await prisma.e21_Personality.create({
      data: {
        appellation_personality: {
          create: {
            value: name,
          },
        },
        role: {
          connectOrCreate: {
            where: {
              value: role,
            },
            create: {
              value: role,
            },
          },
        },
        information_object_personality: {
          create: {
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
