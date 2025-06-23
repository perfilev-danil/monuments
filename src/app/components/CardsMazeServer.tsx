import CardsMaze from "./CardsMaze";

export default async function CardsMazeServer() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`
    );

    if (!res.ok) {
      return (
        <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
          Ошибка загрузки данных: {res.status}
        </div>
      );
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
  } catch (error) {
    return (
      <div className="h-[620px] md:h-[900px] lg:h-screen flex justify-center items-center text-black text-center">
        Не удалось загрузить данные о памятниках.
      </div>
    );
  }
}
