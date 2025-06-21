import { prisma } from "./prisma";

export async function getMonuments() {
  try {
    // Логирование для отладки
    console.log("Подключение к базе данных...");
    console.log("NODE_ENV:", process.env.NODE_ENV);

    // Проверка подключения к Prisma
    await prisma.$queryRaw`SELECT 1`;
    console.log("Подключение к БД успешно");

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
          orderBy: { id: "asc" },
          select: { id: true },
        },
      },
      take: 10, // Ограничиваем для теста
    });

    console.log(`Получено памятников: ${monuments.length}`);

    if (monuments.length === 0) {
      console.warn("В базе данных нет записей о памятниках");
    }

    return monuments;
  } catch (error) {
    console.error("Ошибка при получении памятников:", error);

    // Детализация ошибки Prisma
    if (error instanceof Error) {
      console.error("Сообщение об ошибке:", error.message);
      if (error.stack) {
        console.error("Стек вызовов:", error.stack);
      }
    }

    return [];
  }
}
