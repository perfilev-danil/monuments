import { defaultHandler } from "ra-data-simple-prisma";
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

const convertFileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const handler = async (req: Request) => {
  let body: any;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    body.method === "getManyReference" &&
    body.params.target === "monuments"
  ) {
    body.params.filter = {
      monuments: {
        some: {
          id: body.params.id,
        },
      },
    };
  }

  /* Images */
  if (
    (body.method === "create" || body.method === "update") &&
    body.resource === "e36_Img_monument"
  ) {
    try {
      const { imageData, fileName, mimeType, monumentId } = body.params.data;

      // Валидация входных данных
      if (!imageData || !imageData.startsWith("data:image/")) {
        return NextResponse.json(
          { error: "Некорректные данные изображения" },
          { status: 400 }
        );
      }

      // Проверка существования monument
      const monumentExists = await prisma.e24_Monument.findUnique({
        where: { id: monumentId },
      });

      if (!monumentExists) {
        return NextResponse.json(
          { error: "Указанный памятник не существует" },
          { status: 404 }
        );
      }

      // Обработка изображения
      const [header, base64Data] = imageData.split(",");
      const extractedMimeType = header.split(":")[1].split(";")[0];

      // Проверка размера изображения (не более 5MB)
      const fileSize = Math.ceil(base64Data.length * 0.75);
      if (fileSize > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Размер изображения не должен превышать 5MB" },
          { status: 400 }
        );
      }

      const imageBuffer = Buffer.from(base64Data, "base64");

      // Подготовка данных для БД
      const data = {
        fileName: fileName || `image_${Date.now()}`,
        mimeType: mimeType || extractedMimeType,
        imageData: imageBuffer,
        monumentId,
      };

      // Выполнение операции
      const result =
        body.method === "create"
          ? await prisma.e36_Img_monument.create({ data })
          : await prisma.e36_Img_monument.update({
              where: { id: body.params.id },
              data,
            });

      return NextResponse.json({
        data: {
          id: result.id,
          fileName: result.fileName,
          mimeType: result.mimeType,
          monumentId: result.monumentId,
        },
      });
    } catch (error) {
      console.error("Ошибка базы данных:", error);
      return NextResponse.json(
        {
          error: "Ошибка при сохранении изображения",
          details:
            error instanceof Error ? error.message : "Неизвестная ошибка",
        },
        { status: 500 }
      );
    }
  }

  /* Dimension types to show when choose */
  if (body.method === "getList" && body.resource === "e54_Dimension") {
    const orderBy = body.params.sort
      ? { [body.params.sort.field]: body.params.sort.order.toLowerCase() }
      : undefined;

    const result = await prisma.e54_Dimension.findMany({
      include: { dimension_type: true },
      skip: body.params.pagination.skip,
      take: body.params.pagination.limit,
      where: body.params.filter,
      orderBy: orderBy,
    });

    const total = await prisma.e54_Dimension.count({
      where: body.params.filter,
    });

    return NextResponse.json({ data: result, total });
  }

  /* Create */
  if (body.method === "create" && body.resource === "e24_Monument") {
    const data = body.params.data;

    if (data.colors) {
      data.colors = {
        connect: data.colors.map((id: number) => ({ id })),
      };
    }

    if (data.marks) {
      data.marks = {
        connect: data.marks.map((id: number) => ({ id })),
      };
    }

    if (data.materials) {
      data.materials = {
        connect: data.materials.map((id: number) => ({ id })),
      };
    }

    if (data.techniques) {
      data.techniques = {
        connect: data.techniques.map((id: number) => ({ id })),
      };
    }

    if (data.dimensions) {
      data.dimensions = {
        connect: data.dimensions.map((id: number) => ({ id })),
      };
    }

    if (data.personalities) {
      data.personalities = {
        connect: data.personalities.map((id: number) => ({ id })),
      };
    }

    if (data.events) {
      data.events = {
        connect: data.events.map((id: number) => ({ id })),
      };
    }

    if (data.images) {
      data.images = {
        connect: data.images.map((id: number) => ({ id })),
      };
    }
  }

  /*
  if (body.method === "create" && body.resource === "e54_Dimension") {
    const data = body.params.data;

    if (typeof data.value === "string") {
      data.value = parseFloat(data.value);
    }
  }
  */

  /* Update */
  if (body.method === "update" && body.resource === "e24_Monument") {
    const { id, ...data } = body.params.data;

    if (data.colors) {
      data.colors = {
        set: data.colors.map((id: number) => ({ id })),
      };
    }

    if (data.marks) {
      data.marks = {
        connect: data.marks.map((id: number) => ({ id })),
      };
    }

    if (data.materials) {
      data.materials = {
        set: data.materials.map((id: number) => ({ id })),
      };
    }

    if (data.techniques) {
      data.techniques = {
        set: data.techniques.map((id: number) => ({ id })),
      };
    }

    if (data.dimensions) {
      data.dimensions = {
        connect: data.dimensions.map((id: number) => ({ id })),
      };
    }

    if (data.personalities) {
      data.personalities = {
        connect: data.personalities.map((id: number) => ({ id })),
      };
    }

    if (data.events) {
      data.events = {
        connect: data.events.map((id: number) => ({ id })),
      };
    }

    if (data.images) {
      data.images = {
        connect: data.images.map((id: number) => ({ id })),
      };
    }

    const updated = await prisma.e24_Monument.update({
      where: { id: body.params.id },
      data,
      include: {
        colors: true,
        marks: true,
        materials: true,
        techniques: true,
        dimensions: true,
        personalities: true,
        events: true,
        images: true,
      },
    });

    return NextResponse.json({ data: updated });
  }

  /*
  if (body.method === "update" && body.resource === "e54_Dimension") {
    const data = body.params.data;

    if (typeof data.value === "string") {
      data.value = parseFloat(data.value);
    }
  }
  */

  const result = await defaultHandler(body, prisma);
  return NextResponse.json(result);
};

export { handler as GET, handler as POST };
