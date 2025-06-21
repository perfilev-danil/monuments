// app/collection/page.tsx
import CollectionContent from "../components/CollectionContent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Ожидаем получения searchParams
  const paramsRecord = await searchParams;

  // Преобразуем searchParams в URLSearchParams вручную
  const params = new URLSearchParams();

  // Вместо прямого обращения searchParams[key], перебираем ключи и добавляем в params
  const keys = [
    "periodId",
    "materialId",
    "colorId",
    "techniqueId",
    "markId",
    "placeId",
    "personId",
    "search",
  ];

  for (const key of keys) {
    const value = paramsRecord[key];
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else if (typeof value === "string") {
      params.append(key, value);
    }
  }

  const filtersRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/filters`, {
    cache: "force-cache",
  });

  const monumentsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/monuments?${params.toString()}`,
    {
      cache: "no-cache",
    }
  );

  if (!filtersRes.ok || !monumentsRes.ok) {
    throw new Error("Ошибка загрузки данных");
  }

  const filtersData = await filtersRes.json();
  const monuments = await monumentsRes.json();

  return (
    <CollectionContent
      filtersData={filtersData}
      monuments={monuments}
      initialSearchParams={paramsRecord}
    />
  );
}

/*
"use client";

import { Suspense } from "react";
import CollectionContent from "../components/CollectionContent";
import CollectionSkeleton from "../components/CollectionSkeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../components/Footer";
const queryClient = new QueryClient();
export default function Collection() {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <QueryClientProvider client={queryClient}>
        <CollectionContent />
      </QueryClientProvider>
      <Footer />
    </Suspense>
  );
}

*/
