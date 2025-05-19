import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const colors = await prisma.e55_Color.findMany();

    return NextResponse.json(colors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.value || !body.code) {
      return NextResponse.json(
        { error: "Не указано название или код цвета" },
        { status: 400 }
      );
    }

    const newColor = await prisma.e55_Color.create({
      data: {
        value: body.value,
        code: body.code,
      },
    });

    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при создании цвета" },
      { status: 500 }
    );
  }
}
