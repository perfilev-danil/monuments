"use client";

import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <div
      className="w-full h-[620px] lg:h-screen p-4 lg:p-8
     flex items-center justify-center"
    >
      <div
        className="w-full h-full lg:py-20
      flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-28"
      >
        <div
          className="relative overflow-hidden w-full h-full lg:h-full lg:w-1/2 "
          style={{ border: "1px solid black" }}
        >
          <Image
            src="/images/contents/trio.jpg"
            alt=""
            className="object-cover"
            fill
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex justify-between">
          <div className="flex flex-col gap-8 justify-between">
            <div className="h-full w-full flex flex-col gap-8 lg:gap-0 justify-between">
              <div className=" flex flex-col gap-4 lg:gap-8">
                <h2 className="text-[26px] lg:text-4xl leading-normal text-center lg:text-left">
                  Коллекция памятников
                </h2>
                <p className="lg:w-2/3 text-center lg:text-left text-balance">
                  Откройте Енисейскую Сибирь через её скульптурный эпос, где
                  формаобретает голос —  о суровом быте, замысле художника и
                  вековой истории.
                </p>
                <Link
                  href={"/collection"}
                  className="w-max mx-auto lg:mx-0 rounded-full cursor-pointer p-2  hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  Исследовать коллекцию
                </Link>
              </div>

              <div className="flex flex-col gap-4 lg:gap-8">
                <p className="lg:w-2/3 text-center lg:text-left text-balance">
                  Откройте Енисейскую Сибирь, где формаобретает голос ысле ху
                </p>
                <Link
                  href={"/collection"}
                  className="w-max mx-auto lg:mx-0 rounded-full cursor-pointer p-2  hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  Изучить карту
                </Link>
              </div>

              <div className="bg-black h-[1px] w-full lg:hidden"></div>
            </div>
          </div>
          <div className="bg-black h-full w-[1px] hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
}
