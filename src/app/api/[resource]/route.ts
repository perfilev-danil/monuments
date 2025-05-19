import { defaultHandler } from "ra-data-simple-prisma";
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
const handler = async (req: Request) => {
  let body: any;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    body.method === "getManyReference" &&
    body.params.target === "monuments"
  ) {
    body.params.filter = {
      monuments: {
        some: {
          id: body.params.id,
        },
      },
    };
  }

  /* Dimension types to show when choose */
  if (body.method === "getList" && body.resource === "e54_Dimension") {
    const orderBy = body.params.sort
      ? { [body.params.sort.field]: body.params.sort.order.toLowerCase() }
      : undefined;

    const result = await prisma.e54_Dimension.findMany({
      include: { dimension_type: true },
      skip: body.params.pagination.skip,
      take: body.params.pagination.limit,
      where: body.params.filter,
      orderBy: orderBy,
    });

    const total = await prisma.e54_Dimension.count({
      where: body.params.filter,
    });

    return NextResponse.json({ data: result, total });
  }

  /* Create */
  if (body.method === "create" && body.resource === "e24_Monument") {
    const data = body.params.data;

    if (data.colors) {
      data.colors = {
        connect: data.colors.map((id: number) => ({ id })),
      };
    }

    if (data.materials) {
      data.materials = {
        connect: data.materials.map((id: number) => ({ id })),
      };
    }

    if (data.techniques) {
      data.techniques = {
        connect: data.techniques.map((id: number) => ({ id })),
      };
    }

    if (data.dimensions) {
      data.dimensions = {
        connect: data.dimensions.map((id: number) => ({ id })),
      };
    }
  }

  if (body.method === "create" && body.resource === "e54_Dimension") {
    const data = body.params.data;

    if (typeof data.value === "string") {
      data.value = parseFloat(data.value);
    }
  }

  /* Update */
  if (body.method === "update" && body.resource === "e24_Monument") {
    const { id, ...data } = body.params.data;

    if (data.colors) {
      data.colors = {
        set: data.colors.map((id: number) => ({ id })),
      };
    }

    if (data.materials) {
      data.materials = {
        set: data.materials.map((id: number) => ({ id })),
      };
    }

    if (data.techniques) {
      data.techniques = {
        set: data.techniques.map((id: number) => ({ id })),
      };
    }

    if (data.dimensions) {
      data.dimensions = {
        connect: data.dimensions.map((id: number) => ({ id })),
      };
    }

    const updated = await prisma.e24_Monument.update({
      where: { id: body.params.id },
      data,
      include: {
        colors: true,
        materials: true,
        techniques: true,
        dimensions: true,
      },
    });

    return NextResponse.json({ data: updated });
  }

  if (body.method === "update" && body.resource === "e54_Dimension") {
    const data = body.params.data;

    if (typeof data.value === "string") {
      data.value = parseFloat(data.value);
    }
  }

  const result = await defaultHandler(body, prisma);
  return NextResponse.json(result);
};

export { handler as GET, handler as POST };
