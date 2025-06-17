export async function FilteredMonumentsServer(params: URLSearchParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/monuments?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Ошибка загрузки памятников");
  }

  const monuments = await res.json();
  return monuments;
}
