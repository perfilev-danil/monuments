"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-full">
      <video
        className="hidden lg:block w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Картинка — видно только на мобильных */}
      <Image
        src="/images/contents/hero-mobile.jpg"
        alt=""
        fill
        sizes="(max-width: 768px) 40vw, (max-width: 1200px) 60vw, 50vw"
        className="block lg:hidden w-full h-full object-cover"
      />

      <div
        className="absolute bottom-0 w-full h-full p-4 lg:p-8 z-10
        text-center text-white text-[20px]
        flex flex-col items-center justify-between"
      >
        {/* <div className="w-32 h-[1px] bg-white "></div> */}
        <p className="font-american text-center">ensib-monuments</p>
        <div className="relative w-full flex items-end justify-between">
          <div className="absolute bottom-14 left-0 right-0 mx-auto md:relative md:bottom-0 md:mx-0 w-10 h-10 shrink-0 rounded-full">
            <Image
              src="/images/icons/logo-w.png"
              alt=""
              className=""
              fill
              sizes="(max-width: 768px) 60vw"
            />
          </div>
          <Link href={"/"} className="mx-auto shrink-0">
            <h1 className="font-american leading-5 text-center">
              монументальное искусство <br />
              Енисейской Сибири
            </h1>
          </Link>
          <Link
            href={"/collection"}
            className="relative hidden md:block w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid white" }}
          >
            <Image
              src="/images/icons/collection.png"
              alt=""
              className="p-2"
              fill
              sizes="(max-width: 768px) 60vw"
            />
          </Link>
        </div>
      </div>
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent text-center flex items-end justify-center"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent text-center flex items-end justify-center"></div>
    </div>
  );
}
