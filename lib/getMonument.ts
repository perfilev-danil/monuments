import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

export async function getMonument(id: string) {
  try {
    const monumentId = parseInt(id);

    if (isNaN(monumentId)) {
      return NextResponse.json(
        { error: "Неверный ID памятника" },
        { status: 400 }
      );
    }

    const monument = await prisma.e24_Monument.findUnique({
      where: { id: monumentId },
      select: {
        id: true,
        appellation_monument: {
          select: {
            id: true,
            value: true,
          },
        },
        description_monument: {
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
        materials: {
          select: {
            id: true,
            value: true,
          },
        },
        colors: {
          select: {
            id: true,
            value: true,
          },
        },
        techniques: {
          select: {
            id: true,
            value: true,
          },
        },
        marks: {
          select: {
            id: true,
            value: true,
          },
        },
        period: {
          select: {
            id: true,
            value: true,
          },
        },
        images: {
          select: {
            id: true,
          },
        },
        appellation_registry: {
          select: {
            id: true,
            value: true,
            information_object_registry: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
        inscription: {
          select: {
            id: true,
            value: true,
          },
        },
        conceptual_object: {
          select: {
            id: true,
            value: true,
          },
        },
        appellation_info: {
          select: {
            id: true,
            value: true,
            information_object_info: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
        document: {
          select: {
            id: true,
            value: true,
            information_object_document: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
        personalities: {
          select: {
            id: true,
            appellation_personality: {
              select: {
                id: true,
                value: true,
              },
            },
            role: {
              select: {
                id: true,
                value: true,
              },
            },
            information_object_personality: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        },
        place: {
          select: {
            id: true,
            appellation_place: {
              select: {
                id: true,
                value: true,
              },
            },
            appellation_address: {
              select: {
                id: true,
                value: true,
                coordinates: {
                  select: {
                    id: true,
                    lat: true,
                    lon: true,
                  },
                },
              },
            },
          },
        },
        events: {
          select: {
            id: true,
            appellation_event: {
              select: {
                id: true,
                value: true,
              },
            },
            time_span: {
              select: {
                id: true,
                beginning: true,
                end: true,
              },
            },
            information_object_event: {
              select: {
                id: true,
                value: true,
              },
            },
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

    return monument;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятника" },
      { status: 500 }
    );
  }
}
