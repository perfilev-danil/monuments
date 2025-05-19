import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const monumentId = parseInt(id);

    if (isNaN(monumentId)) {
      return NextResponse.json(
        { error: "Неверный ID памятника" },
        { status: 400 }
      );
    }

    const monument = await prisma.e24_Monument.findUnique({
      where: { id: monumentId },
      include: {
        appellation_monument: true,
        description_monument: true,
        year: true,
        materials: true,
        colors: true,
        techniques: true,
        period: true,
        images: true,
        appellation_registry: {
          include: {
            information_object_registry: true,
          },
        },
        inscription: true,
        conceptual_object: true,
        information_object_okn: true,
        documents: {
          include: {
            information_object_document: true,
          },
        },
        dimensions: {
          include: {
            dimension_type: true,
          },
        },
        personalities: {
          include: {
            appellation_personality: true,
            role: true,
            information_object_personality: true,
          },
        },
        place: {
          include: {
            appellation_place: true,
            appellation_address: {
              include: {
                coordinates: true,
              },
            },
            information_object_place: true,
          },
        },
        events: {
          include: {
            appellation_event: true,
            time_span: true,
            information_object_event: true,
          },
        },
      },
    });

    if (!monument) {
      return NextResponse.json(
        { error: "Памятник не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(monument);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятника" },
      { status: 500 }
    );
  }
}

/*

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
  
    const { id } = await Promise.resolve(params);
    const monumentId = parseInt(id);


    if (isNaN(monumentId)) {
      return NextResponse.json(
        { error: "Неверный ID памятника" },
        { status: 400 }
      );
    }

  
    const deletedMonument = await prisma.e24_Monument.delete({
      where: { id: monumentId },
    });

    return NextResponse.json(deletedMonument);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при удалении памятника" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const monumentId = parseInt(id);
    const body = await request.json();

    if (isNaN(monumentId)) {
      return NextResponse.json(
        { error: "Неверный ID памятника" },
        { status: 400 }
      );
    }

    if (!body.appellation_monument || !body.description_monument) {
      return NextResponse.json(
        { error: "Не указано название или код цвета" },
        { status: 400 }
      );
    }

    const currentMonument = await prisma.e24_Monument.findUnique({
      where: { id: monumentId },
      select: {
        appellation_monument: { select: { id: true } },
        description_monument: { select: { id: true } },
        year: { select: { id: true } },
      },
    });

    if (!currentMonument) {
      return NextResponse.json(
        { error: "Памятник не найден" },
        { status: 404 }
      );
    }

    const updateData: any = {
      appellation_monument: {
        update: {
          value: body.appellation_monument,
        },
      },
      description_monument: {
        update: {
          value: body.description_monument,
        },
      },
      colors: {
        set: body.colorIds?.map((id: number) => ({ id })) || [],
      },
    };

    if (body.year !== undefined) {
      if (currentMonument.year) {

        updateData.year = {
          update: {
            value: body.year,
          },
        };
      } else {
        updateData.year = {
          create: {
            value: body.year,
          },
        };
      }
    }

    const updatedMonument = await prisma.e24_Monument.update({
      where: { id: monumentId },
      data: updateData,
      include: {
        appellation_monument: true,
        description_monument: true,
        year: true,
        colors: true,
      },
    });

    return NextResponse.json(updatedMonument);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при обновлении памятника" },
      { status: 500 }
    );
  }
}


*/
