import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const images = await prisma.e36_Img_monument.findMany({
      select: {
        id: true,
        fileName: true,
        mimeType: true,
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении списка изображений" },
      { status: 500 }
    );
  }
}
