"use client";

import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <div
      className="w-full h-[620px] md:h-[900px] lg:h-screen p-4 lg:p-8
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
            priority
            sizes="(max-width: 300px) 40vw, (max-width: 1200px) 60vw, 50vw"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex justify-between">
          <div className="flex flex-col gap-8 justify-between">
            <div className="h-full w-full flex flex-col gap-8 lg:gap-0 justify-between">
              <div className=" flex flex-col gap-4 lg:gap-8">
                <h2 className="text-[26px] lg:text-4xl leading-normal text-center lg:text-left">
                  Коллекция памятников
                </h2>
                <p className=" text-center lg:text-left">
                  Откройте Енисейскую Сибирь через её скульптурный эпос, где
                  каждый <br className="hidden lg:block" /> монумент — голос
                  прошлого, рассказывающий о закалённых временем{" "}
                  <br className="hidden lg:block" />
                  традициях, мастерстве художника и многовековой истории.
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
                <p className=" text-center lg:text-left ">
                  "Скульптурная летопись Енисейской Сибири" <br /> Три региона —
                  одна история.
                </p>
                <Link
                  href={"/about"}
                  className="w-max mx-auto lg:mx-0 rounded-full cursor-pointer p-2  hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  Узнать о проекте
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
