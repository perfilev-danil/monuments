import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      periodsRes,
      materialsRes,
      colorsRes,
      techniquesRes,
      marksRes,
      placesRes,
      personalitiesRes,
    ] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/periods`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/materials`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/colors`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/techniques`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/marks`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/places`),
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/personalities`),
    ]);

    if (
      !periodsRes.ok ||
      !materialsRes.ok ||
      !colorsRes.ok ||
      !techniquesRes.ok ||
      !marksRes.ok ||
      !placesRes.ok ||
      !personalitiesRes.ok
    ) {
      return NextResponse.json(
        { error: "Ошибка при загрузке фильтров" },
        { status: 500 }
      );
    }

    const [
      periods,
      materials,
      colors,
      techniques,
      marks,
      places,
      personalities,
    ] = await Promise.all([
      periodsRes.json(),
      materialsRes.json(),
      colorsRes.json(),
      techniquesRes.json(),
      marksRes.json(),
      placesRes.json(),
      personalitiesRes.json(),
    ]);

    return NextResponse.json({
      periods,
      materials,
      colors,
      techniques,
      marks,
      places,
      personalities,
    });
  } catch (error) {
    console.error("Ошибка в filters route.ts:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
