"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Monument from "./Monument";

const queryClient = new QueryClient();

export default function MonumentPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Monument />
    </QueryClientProvider>
  );
}
