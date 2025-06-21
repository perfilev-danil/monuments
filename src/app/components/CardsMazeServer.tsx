import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export default async function CardsMazeServer() {
  const monuments = await getMonuments();
  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
        Нет данных о памятниках!
      </div>
    );
  }
  return <CardsMaze monuments={monuments} />;
}
