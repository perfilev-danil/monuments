import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export default async function CardsMazeServer() {
  const monuments = await getMonuments();
  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen text-black text-center py-20">
        Нет данных о памятниках. Проверьте подключение к базе.
      </div>
    );
  }
  return <CardsMaze monuments={monuments} />;
}
