import CollectionContent from "../components/CollectionContent";
import Footer from "../components/Footer";

import { getMonumentsFiltered } from "../../../lib/getMonumentsFiltered";
import { getFilters } from "../../../lib/getFilters";

function parseSearchParams(
  record: Record<string, string | string[] | undefined>
): any {
  const parseToIntArray = (val: string | string[] | undefined): number[] => {
    if (!val) return [];
    return Array.isArray(val) ? val.map(Number) : [Number(val)];
  };

  return {
    periodId: parseToIntArray(record.periodId),
    materialId: parseToIntArray(record.materialId),
    colorId: parseToIntArray(record.colorId),
    techniqueId: parseToIntArray(record.techniqueId),
    markId: parseToIntArray(record.markId),
    placeId: parseToIntArray(record.placeId),
    personId: parseToIntArray(record.personId),
    search: typeof record.search === "string" ? record.search : undefined,
  };
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const paramsRecord = await searchParams;
  const filters = parseSearchParams(paramsRecord);

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

  const [filtersData, monuments] = await Promise.all([
    getFilters(),
    getMonumentsFiltered(filters),
  ]);

  return (
    <div>
      <CollectionContent
        filtersData={filtersData}
        monuments={monuments}
        initialSearchParams={paramsRecord}
      />
      <Footer />
    </div>
  );
}
