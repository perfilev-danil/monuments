import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET(
  request: Request,
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

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType || "application/octet-stream",
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

export async function DELETE(
  request: Request,
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

    await prisma.e36_Img_monument.delete({
      where: { id: imageId },
    });

    return NextResponse.json({
      success: true,
      message: `Изображение с ID ${imageId} успешно удалено`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при удалении изображения" },
      { status: 500 }
    );
  }
}
