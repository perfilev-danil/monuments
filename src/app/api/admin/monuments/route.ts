import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(request: Request) {
  try {
    const monuments = await prisma.e24_Monument.findMany({
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
        document: {
          include: {
            information_object_document: true,
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

    return NextResponse.json(monuments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении памятников" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const year = formData.get("year") as string;
    const concept = formData.get("concept") as string;
    const inscription = formData.get("inscription") as string;
    const registry = formData.get("registry") as string;
    const registry_link = formData.get("registry_link") as string;
    const info = formData.get("info") as string;
    const info_link = formData.get("info_link") as string;
    const document = formData.get("document") as string;
    const document_link = formData.get("document_link") as string;

    const period = formData.get("period") as string;
    const location = formData.get("location") as string;

    const address = formData.get("address") as string;
    const lon = parseFloat(formData.get("lon") as string);
    const lat = parseFloat(formData.get("lat") as string);

    const personalitiesIds = (formData.getAll("personalities") as string[]).map(
      (id) => ({ id: parseInt(id) })
    );

    const eventsIds = (formData.getAll("events") as string[]).map((id) => ({
      id: parseInt(id),
    }));

    const marksIds = (formData.getAll("marks") as string[]).map((id) => ({
      id: parseInt(id),
    }));

    const techniquesIds = (formData.getAll("techniques") as string[]).map(
      (id) => ({
        id: parseInt(id),
      })
    );

    const colorsIds = (formData.getAll("colors") as string[]).map((id) => ({
      id: parseInt(id),
    }));

    const materialsIds = (formData.getAll("materials") as string[]).map(
      (id) => ({
        id: parseInt(id),
      })
    );

    const images = formData.getAll("images") as File[];

    const newMonument = await prisma.e24_Monument.create({
      data: {
        appellation_monument: {
          create: {
            value: name,
          },
        },
        description_monument: {
          create: {
            value: description,
          },
        },
        year: {
          create: {
            value: year,
          },
        },
        conceptual_object: {
          create: {
            value: concept,
          },
        },
        inscription: {
          create: {
            value: inscription,
          },
        },
        appellation_registry: {
          create: {
            value: registry,
            information_object_registry: {
              create: {
                value: registry_link,
              },
            },
          },
        },
        appellation_info: {
          create: {
            value: info,
            information_object_info: {
              create: {
                value: info_link,
              },
            },
          },
        },
        document: {
          create: {
            value: document,
            information_object_document: {
              create: {
                value: document_link,
              },
            },
          },
        },
        period: period ? { connect: { id: parseInt(period) } } : undefined,
        place: {
          create: {
            ...(location && {
              appellation_place: { connect: { id: parseInt(location) } },
            }),
            appellation_address: {
              create: {
                value: address,
                coordinates: { create: { lon, lat } },
              },
            },
          },
        },
        personalities: {
          connect: personalitiesIds,
        },
        events: {
          connect: eventsIds,
        },
        marks: {
          connect: marksIds,
        },
        techniques: {
          connect: techniquesIds,
        },
        colors: {
          connect: colorsIds,
        },
        materials: {
          connect: materialsIds,
        },
        images: {
          create: await Promise.all(
            images.map(async (image) => {
              const buffer = Buffer.from(await image.arrayBuffer());
              return {
                fileName: image.name,
                mimeType: image.type,
                imageData: buffer,
              };
            })
          ),
        },
      },
      include: {
        appellation_monument: true,
        description_monument: true,
        year: true,
        conceptual_object: true,
        inscription: true,
        appellation_registry: {
          include: {
            information_object_registry: true,
          },
        },
        appellation_info: {
          include: {
            information_object_info: true,
          },
        },
        document: {
          include: {
            information_object_document: true,
          },
        },
        period: true,
        place: {
          include: {
            appellation_place: true,
            appellation_address: {
              include: {
                coordinates: true,
              },
            },
          },
        },
        personalities: {
          include: {
            appellation_personality: true,
          },
        },
        events: {
          include: {
            appellation_event: true,
            time_span: true,
          },
        },
        marks: true,
        techniques: true,
        colors: true,
        materials: true,
        images: true,
      },
    });

    return NextResponse.json(newMonument, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании памятника:", error);
    return NextResponse.json(
      {
        error: "Не удалось создать памятник",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
