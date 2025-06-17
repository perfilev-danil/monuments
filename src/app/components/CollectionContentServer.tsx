export const dynamic = "force-dynamic";

import CollectionContent from "./CollectionContent";

export default async function CollectionContentServer() {
  const periodsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/periods`,
    {}
  );
  const materialsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/materials`,
    {}
  );
  const colorsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/colors`,
    {}
  );
  const placesRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/places`,
    {}
  );
  const techniquesRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/techniques`,
    {}
  );
  const marksRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/marks`, {});
  const personalitiesRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/personalities`,
    {}
  );

  const periods = await periodsRes.json();
  const materials = await materialsRes.json();
  const colors = await colorsRes.json();
  const places = await placesRes.json();
  const techniques = await techniquesRes.json();
  const marks = await marksRes.json();
  const personalities = await personalitiesRes.json();

  return (
    <CollectionContent
      initialPeriods={periods}
      initialMaterials={materials}
      initialColors={colors}
      initialPlaces={places}
      initialTechniques={techniques}
      initialMarks={marks}
      initialPersonalities={personalities}
    />
  );
}
