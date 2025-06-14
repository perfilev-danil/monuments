import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const colors = await prisma.e55_Color.findMany();

    return NextResponse.json(colors, { status: 200 });
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
    const code = formData.get("code") as string;

    const newColor = await prisma.e55_Color.create({
      data: {
        value: name,
        code: code,
      },
    });

    revalidatePath("/api/colors");
    return NextResponse.json(newColor, { status: 201 });
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
