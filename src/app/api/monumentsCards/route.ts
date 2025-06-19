import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const cache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 часа

export async function GET() {
  const cacheKey = "monuments";
  const now = Date.now();
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json(cached.data);
  }
  try {
    const monuments = await prisma.e24_Monument.findMany({
      include: {
        appellation_monument: true,
        year: true,
        images: true,
      },
    });

    cache.set(cacheKey, {
      data: monuments,
      expiresAt: now + CACHE_TTL_MS,
    });

    return NextResponse.json(monuments, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятников" },
      { status: 500 }
    );
  }
}
