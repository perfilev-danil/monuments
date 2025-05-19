import { Suspense } from "react";
import CollectionContent from "../components/CollectionContent";
import CollectionSkeleton from "../components/CollectionSkeleton";

export default function Collection() {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionContent />
    </Suspense>
  );
}
