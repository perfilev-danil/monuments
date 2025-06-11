"use client";

import Hero from "./components/Hero";
import Opening from "./components/Opening";

import CardsMaze from "./components/CardsMaze";

import Info from "./components/Info";
import Footer from "./components/Footer";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.to("#wrapper", {
      top: "0",
      ease: "sine.out",
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top bottom",
        end: "top top",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div className="relative scroll-smooth ">
      <div className="h-screen">
        <Hero />
      </div>

      <div
        id="wrapper"
        className="absolute top-[100vh] left-0 w-full z-20 will-change-transform"
      >
        <div className="relative h-[130vh]">
          <div className="sticky top-0">
            <Opening />
          </div>
        </div>

        <div className="relative h-[130vh]">
          <div className="sticky top-0">
            {/*
            <Gallery />
            */}

            <CardsMaze />
          </div>
        </div>

        <div className="relative h-[130vh]">
          <div className="sticky top-0">
            {/*
            <Gallery />
            */}

            <Info />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
