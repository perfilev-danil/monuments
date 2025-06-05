import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <div
      className="w-full h-screen p-8
     flex items-center justify-center"
    >
      <div
        className="w-full h-full py-20
      flex items-center justify-between gap-28"
      >
        <div className="relative overflow-hidden w-1/2 h-full border-1 border-black">
          <Image
            src="/images/contents/trio.jpg"
            alt=""
            className="object-cover"
            fill
          />
        </div>
        <div className="w-1/2 h-full flex justify-between">
          <div className="flex flex-col gap-8 justify-between">
            <div className="h-full flex flex-col justify-between">
              <div className="h-1/2 flex flex-col gap-8">
                <h2 className="text-4xl leading-normal">
                  Коллекция памятников
                </h2>
                <p>
                  Откройте Енисейскую Сибирь через её скульптурный эпос, <br />
                  где формаобретает голос —  о суровом быте, <br />
                  замысле художника и вековой истории.
                </p>
                <Link
                  href={"/collection"}
                  className="w-max rounded-full border-black border-1 cursor-pointer p-2 px-8 hover:scale-110 transition-transform duration-300"
                >
                  Исследовать коллекцию
                </Link>
              </div>

              <div className="flex flex-col gap-8">
                <p>
                  Откройте Енисейскую Сибирь <br />
                  где формаобретает голос
                </p>
                <Link
                  href={"/collection"}
                  className="w-max rounded-full border-black border-1 cursor-pointer p-2 px-8 hover:scale-110 transition-transform duration-300"
                >
                  Изучить карту
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-black h-full w-[1px]"></div>
        </div>
      </div>
    </div>
  );
}
