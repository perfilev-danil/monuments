import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.e31_Document.findMany();

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Ошибка при получении данных" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const link = formData.get("link") as string;

    const newDocument = await prisma.e31_Document.create({
      data: {
        value: name,
        information_object_document: {
          create: {
            value: link,
          },
        },
      },
      include: {
        information_object_document: true,
      },
    });

    revalidatePath("/api/documents");
    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании:", error);
    return NextResponse.json(
      {
        error: "Не удалось создать",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
