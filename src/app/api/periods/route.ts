// app/api/monuments/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // путь зависит от твоей структуры

export async function GET() {
  try {
    const periods = await prisma.e4_Period.findMany(); // value уже включено по умолчанию

    return NextResponse.json(periods);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении цветов" },
      { status: 500 }
    );
  }
}

/*

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newMonument = await prisma.e24_Monument.create({
      data: {
        appellation: { create: { value: body.appellation } },
        description: { create: { value: body.description } },
      },
    });

    return NextResponse.json(newMonument);
  } catch (error) {
    console.error("Ошибка при добавлении памятника:", error);
    return NextResponse.json(
      { error: "Ошибка при добавлении памятника" },
      { status: 500 }
    );
  }
}

*/
