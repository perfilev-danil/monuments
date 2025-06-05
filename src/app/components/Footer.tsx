"use client";

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
    <div className="w-full h-96 bg-[var(--dark)] text-white flex p-8 text-sm">
      <div className="w-1/3 flex flex-col justify-between">
        <p>
          По вопросам и предложениям <br /> обращайтесь в Telegram
        </p>

        <div className="w-[1px] h-10 bg-white "></div>
        <p>
          Copyright <br />©{" "}
          <Link href="https://sfu.ru/ru">
            Сибирский федеральный университет
          </Link>
        </p>
      </div>
      <div className="w-1/3 flex flex-col justify-between items-center">
        <p className="font-american text-lg text-center">ensib-monuments</p>
        <Link
          href={"/"}
          className="relative w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <Image src="/images/icons/logo-w.png" alt="" className="" fill />
        </Link>
        <p className="font-american leading-5 text-lg text-center">
          монументальное искусство <br /> Енисейской Сибири
        </p>
      </div>
      <div className="w-1/3 flex flex-col justify-between items-end">
        <button className="relative w-10 h-10 rounded-full border-white border-1 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300">
          <Image src="/images/icons/tg.png" alt="" className="p-2" fill />
        </button>
        <div className="w-[1px] h-10 bg-white "></div>

        <button
          onClick={ScrollToUp}
          className="relative w-10 h-10 rounded-full border-white border-1 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
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
