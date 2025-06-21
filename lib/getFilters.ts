import { prisma } from "./prisma";

export async function getFilters() {
  try {
    const periods = await prisma.e4_Period.findMany();
    const materials = await prisma.e57_Material.findMany();
    const colors = await prisma.e55_Color.findMany();
    const techniques = await prisma.e55_Technique.findMany();
    const marks = await prisma.e37_Mark.findMany();
    const places = await prisma.e41_Appellation_place.findMany({
      select: {
        id: true,
        value: true,
        e53_Place: {
          select: {
            id: true,
          },
        },
      },
    });
    const personalities = await prisma.e41_Appellation_personality.findMany();
    return {
      periods,
      materials,
      colors,
      techniques,
      marks,
      places,
      personalities,
    };
  } catch (error) {
    console.error("Ошибка при получении памятников:", error);
    return [];
  }
}
