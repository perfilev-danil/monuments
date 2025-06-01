import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const periodIds = searchParams.getAll("periodId");
    const materialIds = searchParams.getAll("materialId");
    const colorIds = searchParams.getAll("colorId");
    const techniqueIds = searchParams.getAll("techniqueId");
    const markIds = searchParams.getAll("markId");
    const placeIds = searchParams.getAll("placeId");
    const personalityIds = searchParams.getAll("personId");

    const where: any = {};

    if (periodIds.length > 0) {
      where.OR = periodIds.map((id) => ({
        periodId: parseInt(id),
      }));
    }

    if (materialIds.length > 0) {
      where.materials = {
        some: {
          id: {
            in: materialIds.map((id) => parseInt(id)),
          },
        },
      };
    }

    if (colorIds.length > 0) {
      where.colors = {
        some: {
          id: {
            in: colorIds.map((id) => parseInt(id)),
          },
        },
      };
    }

    if (techniqueIds.length > 0) {
      where.techniques = {
        some: {
          id: {
            in: techniqueIds.map((id) => parseInt(id)),
          },
        },
      };
    }

    if (markIds.length > 0) {
      where.marks = {
        some: {
          id: {
            in: markIds.map((id) => parseInt(id)),
          },
        },
      };
    }

    if (placeIds.length > 0) {
      where.place = {
        appellation_place: {
          id: {
            in: placeIds.map((id) => parseInt(id)),
          },
        },
      };
    }

    if (personalityIds.length > 0) {
      where.personalities = {
        some: {
          appellation_personality: {
            id: {
              in: personalityIds.map((id) => parseInt(id)),
            },
          },
        },
      };
    }

    const monuments = await prisma.e24_Monument.findMany({
      where,
      include: {
        appellation_monument: true,
        year: true,
        materials: true,
        colors: true,
        techniques: true,
        marks: true,
        period: true,
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
        images: true,
      },
    });

    return NextResponse.json(monuments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятников" },
      { status: 500 }
    );
  }
}

/* 
  
  export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.appellation_monument ||
      !body.description_monument ||
      !body.year
    ) {
      return NextResponse.json(
        { error: "Не указано одно из свойств памятника" },
        { status: 400 }
      );
    }

    const newMonument = await prisma.e24_Monument.create({
      data: {
        appellation_monument: {
          create: {
            value: body.appellation_monument,
          },
        },
        description_monument: {
          create: {
            value: body.description_monument,
          },
        },
        year: {
          create: {
            value: body.year,
          },
        },
        colors: {
          connect: body.colorIds?.map((id: number) => ({ id })) || [],
        },
      },
      include: {
        appellation_monument: true,
        description_monument: true,
        year: true,
        colors: true,
      },
    });

    return NextResponse.json(newMonument, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при создании нового памятника" },
      { status: 500 }
    );
  }
}



  
  */
