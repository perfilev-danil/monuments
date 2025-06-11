"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Info() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px — tailwind breakpoint для lg
    };

    checkScreenSize(); // начальная проверка
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <div
      className="w-full h-screen p-4 lg:p-8
     flex items-center justify-center"
    >
      <div
        className="w-full h-full lg:py-20
      flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-28"
      >
        <div className="relative overflow-hidden w-full h-full lg:h-full lg:w-1/2 border border-black">
          <Image
            src="/images/contents/trio.jpg"
            alt=""
            className="object-cover"
            fill
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex justify-between">
          <div className="flex flex-col gap-8 justify-between">
            <div className="h-full w-full flex flex-col gap-8 lg:gap-0 justify-between text-left">
              <div className=" flex flex-col gap-4 lg:gap-8">
                <h2 className="text-[26px] lg:text-4xl leading-normal">
                  Коллекция памятников
                </h2>
                <p className="lg:w-2/3 text-left text-balance">
                  Откройте Енисейскую Сибирь через её скульптурный эпос, где
                  формаобретает голос —  о суровом быте, замысле художника и
                  вековой истории.
                </p>
                <Link
                  href={"/collection"}
                  className="w-max  rounded-full border-black border cursor-pointer p-2  hover:scale-110 transition-transform duration-300"
                >
                  Исследовать коллекцию
                </Link>
              </div>

              <div className="flex flex-col gap-4 lg:gap-8">
                <p className="lg:w-2/3 text-left text-balance">
                  Откройте Енисейскую Сибирь, где формаобретает голос ысле ху
                </p>
                <Link
                  href={"/collection"}
                  className="w-max  rounded-full border-black border cursor-pointer p-2  hover:scale-110 transition-transform duration-300"
                >
                  Изучить карту
                </Link>
              </div>
              {isMobile && <div className="bg-black w-full h-[1px]"></div>}
            </div>
          </div>
          <div className="bg-black h-full w-[1px]"></div>
        </div>
      </div>
    </div>
  );
}
