import { connect } from "http2";
import { prisma } from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  NextRequest: Request,
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

    await prisma.e24_Monument.delete({
      where: { id: monumentId },
    });

    return NextResponse.json({ message: "Удалено" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    return NextResponse.json(
      {
        error: "Не удалось удалить памятник",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const imagesFiles = formData.getAll("images") as File[];

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

    async function saveImages(files: File[]) {
      const savedImages = await Promise.all(
        files.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return {
            fileName: file.name,
            mimeType: file.type,
            imageData: buffer,
          };
        })
      );
      return savedImages;
    }

    const savedImagesData = await saveImages(imagesFiles);

    const updatedMonument = await prisma.e24_Monument.update({
      where: { id: monumentId },
      data: {
        appellation_monument: {
          update: { value: name },
        },
        description_monument: {
          update: { value: description },
        },
        year: {
          update: {
            value: year,
          },
        },
        conceptual_object: {
          update: {
            value: concept,
          },
        },
        inscription: {
          update: {
            value: inscription,
          },
        },
        appellation_registry: {
          update: {
            value: registry,
            information_object_registry: {
              update: {
                value: registry_link,
              },
            },
          },
        },
        appellation_info: {
          update: {
            value: info,
            information_object_info: {
              update: {
                value: info_link,
              },
            },
          },
        },
        document: {
          update: {
            value: document,
            information_object_document: {
              update: {
                value: document_link,
              },
            },
          },
        },
        period: period ? { connect: { id: parseInt(period) } } : undefined,
        place: {
          upsert: {
            create: {
              ...(location && {
                appellation_place: { connect: { id: parseInt(location) } },
              }),
              appellation_address: {
                create: {
                  value: address,
                  coordinates: {
                    create: {
                      lon: lon,
                      lat: lat,
                    },
                  },
                },
              },
            },
            update: {
              ...(location && {
                appellation_place: { connect: { id: parseInt(location) } },
              }),
              appellation_address: {
                upsert: {
                  create: {
                    value: address,
                    coordinates: {
                      create: {
                        lon: lon,
                        lat: lat,
                      },
                    },
                  },
                  update: {
                    value: address,
                    coordinates: {
                      update: {
                        lon: lon,
                        lat: lat,
                      },
                    },
                  },
                },
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
          createMany: {
            data: savedImagesData.map((img) => ({
              fileName: img.fileName,
              mimeType: img.mimeType,
              imageData: img.imageData,
            })),
          },
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

    return NextResponse.json(updatedMonument, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении памятника:", error);
    return NextResponse.json(
      {
        error: "Не удалось обновить памятник",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: "nodejs",
};
