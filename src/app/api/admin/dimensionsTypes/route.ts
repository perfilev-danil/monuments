import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const dts = await prisma.e55_Dimension_type.findMany();

    return NextResponse.json(dts, { status: 200 });
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

    const newDT = await prisma.e55_Dimension_type.create({
      data: {
        value: name,
      },
    });

    revalidatePath("/api/dimensionTypes");
    return NextResponse.json(newDT, { status: 201 });
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
