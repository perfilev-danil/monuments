import Image from "next/image";

export default function Info() {
  return (
    <div className="bg-gray-200 w-full h-screen flex gap-12 items-center justify-center">
      <div className="w-[60%] flex gap-12">
        <div className="w-1/2 h-96 bg-amber-500"></div>
        <div className="w-1/2 flex flex-col justify-between">
          <p>
            Коллекция памятников
            <br /> монументального искусства
            <br /> Енисейской Сибири
          </p>
          <button className="w-36 rounded-full border-white border-2 cursor-pointer p-2">
            Найти
          </button>
        </div>
      </div>
    </div>
  );
}
