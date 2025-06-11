"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);

  const ScrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px — tailwind breakpoint для lg
    };

    checkScreenSize(); // начальная проверка
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative w-full h-64 lg:h-96 bg-[var(--dark)] text-white flex p-4 lg:p-8 text-sm">
      <div className="lg:w-1/3 flex flex-col justify-between">
        <p>
          По вопросам и предложениям <br /> обращайтесь в Telegram
        </p>

        <div className="w-[1px] h-10 bg-white "></div>
        <p>
          Copyright {isDesktop && <br />}
          <Link href="https://sfu.ru/ru">
            Сибирский федеральный университет
          </Link>
        </p>
      </div>
      <div
        className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  lg:relative lg:left-0 lg:top-0 lg:transform-none lg:-translate-x-0 lg:-translate-y-0
                   lg:w-1/3 flex flex-col justify-between items-center text-[20px]"
      >
        {isDesktop && (
          <p className="font-american text-center">ensib-monuments</p>
        )}
        <Link
          href={"/"}
          className="relative w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <Image src="/images/icons/logo-w.png" alt="" className="" fill />
        </Link>
        {isDesktop && (
          <p className="font-american leading-5 text-center">
            монументальное искусство <br /> Енисейской Сибири
          </p>
        )}
      </div>
      <div className="w-1/2 lg:w-1/3 flex flex-col justify-between items-end">
        <button
          className="relative w-10 h-10 rounded-full  cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid white" }}
        >
          <Image src="/images/icons/tg.png" alt="" className="p-2" fill />
        </button>
        <div className="w-[1px] h-10 bg-white "></div>

        <button
          onClick={ScrollToUp}
          className="relative w-10 h-10 rounded-full  cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid white" }}
        >
          <Image
            src="/images/icons/arrow.png"
            alt=""
            className="p-2 rotate-90"
            fill
          />
        </button>
      </div>
    </div>
  );
}
