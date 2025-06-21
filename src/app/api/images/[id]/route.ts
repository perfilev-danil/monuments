import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  NextRequest: NextRequest,
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
    } else if (typeof image.imageData === "string") {
      imageBuffer = Buffer.from(image.imageData, "base64");
    } else {
      imageBuffer = Buffer.from(image.imageData as any);
    }

    const contentType = image.mimeType || "image/jpeg";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": imageBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${encodeURIComponent(
          image.fileName ||
            `image-${imageId}.${contentType.split("/")[1] || "jpg"}`
        )}"`,
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
