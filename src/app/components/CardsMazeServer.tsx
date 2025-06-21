import CardsMaze from "./CardsMaze";
//import { getMonuments } from "../../../lib/getMonuments";
import { getMonumentsFiltered } from "../../../lib/getMonumentsFiltered";

export default async function CardsMazeServer() {
  const rawMonuments = await getMonumentsFiltered({
    periodId: [],
    materialId: [],
    colorId: [],
    techniqueId: [],
    markId: [],
    placeId: [],
    personId: [],
    search: "",
  });

  const monuments = JSON.parse(JSON.stringify(rawMonuments));

  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
        Нет данных о памятниках!
      </div>
    );
  }
  return <CardsMaze monuments={monuments} />;
}
