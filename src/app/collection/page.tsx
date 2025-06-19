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
