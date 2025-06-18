"use server";

export default async function CardsServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`);

  const monuments = await res.json();

  if (!res.ok) {
    throw new Error("Ошибка загрузки памятников");
  }

  return monuments;
}
