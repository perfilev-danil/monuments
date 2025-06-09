"use client";

import Hero from "./components/Hero";
import Opening from "./components/Opening";

import Gallery from "./components/Gallery";

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
      ease: "none",
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative">
      <div className="h-screen">
        <Hero />
      </div>

      <div id="wrapper" className="absolute top-[100vh] left-0 w-full z-20">
        <div className="relative h-[140vh]">
          <div className="sticky top-0">
            <Opening />
          </div>
        </div>

        <div className="relative h-[140vh]">
          <div className="sticky top-0">
            {/*
            <Gallery />
            */}

            <CardsMaze />
          </div>
        </div>

        <div className="relative h-[140vh]">
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
