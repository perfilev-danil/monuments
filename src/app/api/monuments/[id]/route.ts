import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const revalidate = 86400;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const monumentId = parseInt(id);

    if (isNaN(monumentId)) {
      return NextResponse.json(
        { error: "Неверный ID памятника" },
        { status: 400 }
      );
    }

    const monument = await prisma.e24_Monument.findUnique({
      where: { id: monumentId },
      include: {
        appellation_monument: true,
        description_monument: true,
        year: true,
        materials: true,
        colors: true,
        techniques: true,
        marks: true,
        period: true,
        images: true,
        appellation_registry: {
          include: {
            information_object_registry: true,
          },
        },
        inscription: true,
        conceptual_object: true,
        appellation_info: {
          include: {
            information_object_info: true,
          },
        },
        documents: {
          include: {
            information_object_document: true,
          },
        },
        dimensions: {
          include: {
            dimension_type: true,
          },
        },
        personalities: {
          include: {
            appellation_personality: true,
            role: true,
            information_object_personality: true,
          },
        },
        place: {
          include: {
            appellation_place: true,
            appellation_address: {
              include: {
                coordinates: true,
              },
            },
            information_object_place: true,
          },
        },
        events: {
          include: {
            appellation_event: true,
            time_span: true,
            information_object_event: true,
          },
        },
      },
    });

    if (!monument) {
      return NextResponse.json(
        { error: "Памятник не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json(monument);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятника" },
      { status: 500 }
    );
  }
}
