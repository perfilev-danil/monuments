import { prisma } from "./prisma";

export async function getMonuments() {
  try {
    const monuments = await prisma.e24_Monument.findMany({
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
          select: {
            id: true,
          },
          take: 1,
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return monuments;
  } catch (error) {
    console.error("Ошибка в getMonuments:", error);
    return [];
  }
}
