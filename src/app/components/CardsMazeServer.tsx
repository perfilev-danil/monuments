import CardsMaze from "./CardsMaze";
import { getMonuments } from "../../../lib/getMonuments";

export default async function CardsMazeServer() {
  let monuments: any = [];

  try {
    monuments = await getMonuments();
  } catch (error) {
    console.error("Ошибка при загрузке памятников:", error);
  }

  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
        Нет данных о памятниках!
      </div>
    );
  }

  return <CardsMaze monuments={monuments} />;
}

/*
import CardsMaze from "./CardsMaze";

export default async function CardsMazeServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`);

  if (!res.ok) {
    throw new Error(`Ошибка HTTP: ${res.status}`);
  }

  const monuments = await res.json();
  if (!monuments || monuments.length === 0) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
        Нет данных о памятниках!
      </div>
    );
  }

  return <CardsMaze monuments={monuments} />;
}

*/
