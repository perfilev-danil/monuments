"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./components/Hero";
import Opening from "./components/Opening";
import Gallery from "./components/Gallery";
import Info from "./components/Info";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.to("#wrapper", {
      //y: "-100vh",
      top: 0,
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top bottom", // Начинаем когда верх wrapper появится внизу экрана
        end: "top top", // Заканчиваем когда верх wrapper достигнет верха
        scrub: 1,
        markers: true,
      },
    });

    ScrollTrigger.create({
      trigger: "#opening",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      onToggle: ({ isActive }) => {
        gsap.to("#opening", {
          autoAlpha: isActive ? 1 : 0.8,
          duration: 0.3,
        });
      },
    });
  }, []);

  {
    /*
      ScrollTrigger.create({
      trigger: "#wrapper",
      start: "top top",
      end: "+=100%", // Фиксировать на 100% высоты viewport
      pin: true,
      pinSpacing: false, // Отключаем автоматические отступы
      markers: true,
    });
  */
  }

  return (
    <div className="relative">
      {/* Hero - первый экран */}
      <div className="">
        <Hero />
      </div>

      {/* Wrapper - изначально под Hero */}
      <div id="wrapper" className=" bg-white absolute w-full">
        <div id="opening" className="z-20">
          <Opening />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="info">
          <Info />
        </div>
        <Footer />
      </div>
    </div>
  );
}
