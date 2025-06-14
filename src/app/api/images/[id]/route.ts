import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const revalidate = 86400;

export async function GET(
  NextRequest: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    if (!image) {
      return NextResponse.json(
        { error: "Изображение не найдено" },
        { status: 404 }
      );
    }

    if (!image.imageData) {
      return NextResponse.json(
        { error: "Данные изображения отсутствуют" },
        { status: 404 }
      );
    }

    let imageBuffer: Buffer;
    if (image.imageData instanceof Buffer) {
      imageBuffer = image.imageData;
    } else if (image.imageData instanceof Uint8Array) {
      imageBuffer = Buffer.from(image.imageData);
    } else {
      return NextResponse.json(
        { error: "Неподдерживаемый формат изображения" },
        { status: 400 }
      );
    }

    const response = new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(
          image.fileName || "image"
        )}"`,
        "Content-Length": imageBuffer.length.toString(),
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении изображения" },
      { status: 500 }
    );
  }
}
