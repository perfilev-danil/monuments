import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

export async function getMonumentsFiltered(filters: any) {
  try {
    const {
      periodId = [],
      materialId = [],
      colorId = [],
      techniqueId = [],
      markId = [],
      placeId = [],
      personId = [],
      search,
    } = filters;

    const where: any = {};

    if (search) {
      where.appellation_monument = {
        value: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    if (periodId.length > 0) {
      where.OR = periodId.map((id: any) => ({
        periodId: parseInt(id),
      }));
    }

    if (materialId.length > 0) {
      where.materials = {
        some: {
          id: {
            in: materialId.map((id: any) => parseInt(id)),
          },
        },
      };
    }

    if (colorId.length > 0) {
      where.colors = {
        some: {
          id: {
            in: colorId.map((id: any) => parseInt(id)),
          },
        },
      };
    }

    if (techniqueId.length > 0) {
      where.techniques = {
        some: {
          id: {
            in: techniqueId.map((id: any) => parseInt(id)),
          },
        },
      };
    }

    if (markId.length > 0) {
      where.marks = {
        some: {
          id: {
            in: markId.map((id: any) => parseInt(id)),
          },
        },
      };
    }

    if (placeId.length > 0) {
      where.place = {
        appellation_place: {
          id: {
            in: placeId.map((id: any) => parseInt(id)),
          },
        },
      };
    }

    if (personId.length > 0) {
      where.personalities = {
        some: {
          appellation_personality: {
            id: {
              in: personId.map((id: any) => parseInt(id)),
            },
          },
        },
      };
    }

    const monuments = await prisma.e24_Monument.findMany({
      where,
      select: {
        id: true,
        appellation_monument: {
          select: { value: true },
        },
        year: {
          select: { value: true },
        },
        materials: {
          select: { value: true },
        },
        colors: {
          select: { value: true },
        },
        techniques: {
          select: { value: true },
        },
        marks: {
          select: { value: true },
        },
        period: {
          select: { value: true },
        },
        personalities: {
          select: {
            appellation_personality: {
              select: { value: true },
            },
          },
        },
        place: {
          select: {
            appellation_place: {
              select: { value: true },
            },
            appellation_address: {
              select: {
                value: true,
                coordinates: {
                  select: {
                    lat: true,
                    lon: true,
                  },
                },
              },
            },
          },
        },
        images: {
          take: 1,
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
          },
        },
      },
    });

    return monuments;
  } catch (error) {
    console.error(error);
    return [];
  }
}
