import Image from "next/image";

export default function Info() {
  return (
    <div
      className="w-full h-screen p-8
     flex items-center justify-center"
    >
      <div
        className="w-full h-full py-20
      flex items-center justify-between gap-20"
      >
        <div className="w-1/2 h-full bg-[var(--darkcyan)]"></div>
        <div className="w-1/2 h-full flex justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl leading-normal">Коллекция памятников</h2>
              <p>
                Откройте Енисейскую Сибирь через её скульптурный эпос, <br />
                где формаобретает голос —  о суровом быте, <br />
                замысле художника и вековой истории.
              </p>
            </div>
            <button className="w-max rounded-full border-black border-2 cursor-pointer p-2 px-8">
              Исследовать коллекцию
            </button>
          </div>
          <div className="bg-black h-full w-[1px]"></div>
        </div>
      </div>
    </div>
  );
}
