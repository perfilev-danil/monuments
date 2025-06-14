import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export const revalidate = 86400;

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
    const searchQuery = searchParams.get("search");

    const where: any = {};

    if (searchQuery) {
      where.appellation_monument = {
        value: {
          contains: searchQuery,
          mode: "insensitive",
        },
      };
    }

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
