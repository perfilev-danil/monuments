import CardsMaze from "./CardsMaze";

export default async function CardsMazeServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`, {
    next: { revalidate: 60 },
  });

  const monuments = await res.json();

  return <CardsMaze initialMonuments={monuments} />;
}
