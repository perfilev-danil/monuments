"use client";
import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    const video = document.querySelector("video");
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.setAttribute("muted", "true");
      video.setAttribute("playsinline", "true");

      const tryPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Не удалось воспроизвести видео:", error);
          });
        }
      };

      video.addEventListener("canplaythrough", tryPlay, { once: true });
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="auto"
        poster="images/contents/hero.jpg"
        className="w-full h-full object-cover"
      >
        <source src="videos/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute bottom-0 w-full h-full p-4 lg:p-8 z-10
        text-center text-white text-lg
        flex flex-col items-center justify-between"
      >
        {/* <div className="w-32 h-[1px] bg-white "></div> */}
        <p className="font-american  text-center">ensib-monuments</p>
        <div className="w-full flex items-end justify-between">
          <div className="relative w-10 h-10">
            <Image src="/images/icons/logo-w.png" alt="" className="" fill />
          </div>
          <h1 className="font-american  leading-5 text-center">
            монументальное искусство <br />
            Енисейской Сибири
          </h1>
          <Link
            href={"/collection"}
            className="relative w-10 h-10 rounded-full border-white border cursor-pointer hover:scale-110 transition-transform duration-300"
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
