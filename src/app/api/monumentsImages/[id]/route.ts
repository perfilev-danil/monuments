import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    //const { id } = await Promise.resolve(params);
    const { id } = await params;

    if (!id) {
      return new NextResponse("ID изображения не указан", { status: 400 });
    }

    const imageId = parseInt(id, 10);

    if (isNaN(imageId)) {
      return new NextResponse("Неверный ID изображения", { status: 400 });
    }

    const image = await prisma.e36_Img_monument.findUnique({
      where: { id: imageId },
    });

    if (!image || !image.imageData) {
      return new NextResponse("Изображение не найдено", { status: 404 });
    }

    return new NextResponse(image.imageData, {
      headers: {
        "Content-Type": image.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${image.fileName}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении изображения" },
      { status: 500 }
    );
  }
}
