import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export default async function CardsMazeServer() {
  const monuments = await getMonuments();
  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-between items-center text-black text-center">
        Нет данных о памятниках. <br /> Проверьте подключение к базе.
      </div>
    );
  }
  return <CardsMaze monuments={monuments} />;
}
