"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="/gifs/hero.gif"
        alt=""
        fill
        className="w-full h-full object-cover"
      />

      <div
        className="absolute bottom-0 w-full h-full p-4 lg:p-8 z-10
        text-center text-white text-[20px]
        flex flex-col items-center justify-between"
      >
        {/* <div className="w-32 h-[1px] bg-white "></div> */}
        <p className="font-american text-center">ensib-monuments</p>
        <div className="relative w-full flex items-end justify-between">
          <div className="absolute bottom-16 left-0 right-0 mx-auto lg:relative lg:bottom-0 lg:mx-0 w-10 h-10 shrink-0 rounded-full">
            <Image src="/images/icons/logo-w.png" alt="" className="" fill />
          </div>
          <Link href={"/"} className="mx-auto shrink-0">
            <h1 className="font-american leading-5 text-center">
              монументальное искусство <br />
              Енисейской Сибири
            </h1>
          </Link>
          <Link
            href={"/collection"}
            className="relative hidden lg:block w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
            style={{ border: "1px solid white" }}
          >
            <Image
              src="/images/icons/collection.png"
              alt=""
              className="p-2"
              fill
            />
          </Link>
        </div>
      </div>
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent text-center flex items-end justify-center"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent text-center flex items-end justify-center"></div>
    </div>
  );
}
