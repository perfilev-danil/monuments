import { prisma } from "./prisma";

export async function getMonuments() {
  try {
    const where: any = {};
    const monuments = await prisma.e24_Monument.findMany({
      where,
      select: {
        id: true,
        appellation_monument: {
          select: {
            id: true,
            value: true,
          },
        },
        year: {
          select: {
            id: true,
            value: true,
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
