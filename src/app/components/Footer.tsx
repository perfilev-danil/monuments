"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const ScrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-96 bg-[var(--dark)] text-white flex justify-between p-4 lg:p-8 text-sm">
      <div className="lg:w-1/3 flex flex-col justify-between">
        <p>
          По вопросам и предложениям <br /> обращайтесь в Telegram
        </p>

        <div className="w-[1px] h-10 bg-white "></div>
        <p>
          Copyright ©<br />
          <Link href="https://sfu.ru/ru">
            Сибирский федеральный университет
          </Link>
        </p>
      </div>
      <div
        className="w-full lg:w-1/3 absolute z-20 inset-0 flex justify-center
                  lg:relative lg:left-0 lg:top-0
                   lg:flex-col lg:justify-between items-center text-[20px]"
      >
        <p className="hidden lg:block font-american text-center">
          ensib-monuments
        </p>

        <Link
          href={"/"}
          className="relative w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <Image
            src="/images/icons/logo-w.png"
            alt=""
            className=""
            fill
            sizes="(max-width: 768px) 60vw"
            priority
          />
        </Link>

        <p className="hidden lg:block font-american leading-5 text-center">
          монументальное искусство <br /> Енисейской Сибири
        </p>
      </div>
      <div className="w-1/4 lg:w-1/3 z-30 flex flex-col justify-between items-end">
        <button
          className="relative w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid white" }}
        >
          <Image
            src="/images/icons/tg.png"
            alt=""
            className="p-2"
            fill
            sizes="(max-width: 768px) 60vw"
            priority
          />
        </button>
        <div className="w-[1px] h-10 bg-white "></div>

        <button
          onClick={ScrollToUp}
          className="relative w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid white" }}
        >
          <Image
            src="/images/icons/arrow.png"
            alt=""
            className="p-2"
            fill
            sizes="(max-width: 768px) 60vw"
            style={{ transform: "rotate(90deg)" }}
            priority
          />
        </button>
      </div>
    </div>
  );
}
