import Monument from "./Monument";
import { notFound } from "next/navigation";

export default async function MonumentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/monuments/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return notFound();
      }
      throw new Error("Failed to fetch monument data");
    }

    const monument = await res.json();
    return <Monument monument={monument} />;
  } catch (error) {
    return notFound();
  }
}
