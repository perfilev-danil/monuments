import { prisma } from "./prisma";

export async function getMonuments() {
  try {
    const where: any = {};
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
              select: { value: true },
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
  } catch (error: any) {
    return [];
  }
}
