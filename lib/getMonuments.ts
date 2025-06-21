import { prisma } from "./prisma";
import fs from "fs/promises";
import path from "path";

const logFile = path.join("/tmp", "debug.log");

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
    await fs.appendFile(
      logFile,
      `${new Date().toISOString()}: ERROR - ${error.message}\n`
    );
    return [];
  }
}
