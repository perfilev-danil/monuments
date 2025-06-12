"use client";

import Hero from "./components/Hero";
import Opening from "./components/Opening";

import CardsMaze from "./components/CardsMaze";

import Info from "./components/Info";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
  }, []);

  useEffect(() => {
    gsap.to("#wrapper", {
      top: "0",
      ease: "sine.in",
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative scroll-smooth">
      <div className="h-[100svh]">
        <Hero />
      </div>

      {!isDesktop ? (
        <div id="wrapper" className="absolute top-[100vh] left-0 w-full z-20">
          <div className="relative h-full">
            <div className="sticky top-0">
              <Opening />
              <CardsMaze />
              <Info />
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div id="wrapper" className="absolute top-[100vh] left-0 w-full z-20">
          <div className="relative h-[130vh]">
            <div className="sticky top-0">
              <Opening />
            </div>
          </div>

          <div className="relative h-[130vh]">
            <div className="sticky z-100 top-0">
              <CardsMaze />
            </div>
          </div>

          <div className="relative h-[130vh]">
            <div className="sticky top-0">
              <Info />
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}
