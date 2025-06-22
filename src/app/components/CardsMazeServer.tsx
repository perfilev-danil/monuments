import CardsMaze from "./CardsMaze";

export default async function CardsMazeServer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`);
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
