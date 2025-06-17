import { Suspense } from "react";
import CollectionContent from "../components/CollectionContent";
import CollectionContentServer from "../components/CollectionContentServer";
import CollectionSkeleton from "../components/CollectionSkeleton";
import Footer from "../components/Footer";

export default function Collection() {
  return (
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionContentServer />
      <Footer />
    </Suspense>
  );
}
