import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const locations = await prisma.e41_Appellation_place.findMany();

    return NextResponse.json(locations, { status: 200 });
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

    const newLocation = await prisma.e41_Appellation_place.create({
      data: {
        value: name,
      },
    });

    return NextResponse.json(newLocation, { status: 201 });
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
