import { prisma } from "./prisma";

export async function getMonuments() {
  try {
    const monuments = await prisma.e24_Monument.findMany({
      select: {
        id: true,
        appellation_monument: {
          select: {
            value: true,
          },
        },
        year: {
          select: {
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

    console.log("Памятники 1", monuments);

    return monuments;
  } catch (error) {
    console.error("Ошибка при получении памятников:", error);
    return [];
  }
}
