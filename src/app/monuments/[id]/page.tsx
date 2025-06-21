import Monument from "./Monument";
import { getMonument } from "../../../../lib/getMonument";
import { notFound } from "next/navigation";

export default async function MonumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  try {
    const monument = await getMonument(id);
    return <Monument monument={monument} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
