//"use client";

import Hero from "./components/Hero";
import Opening from "./components/Opening";
import CardsMaze from "./components/CardsMaze";
import Info from "./components/Info";
import Footer from "./components/Footer";
import StickySection from "./components/StickySection";
import CardsMazeServer from "./components/CardsMazeServer";

//import { useState, useEffect } from "react";
//import gsap from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger";

//gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  //const [isDesktop, setIsDesktop] = useState(false);

  /*
  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    gsap.to("#wrapper", {
      top: "0",
      ease: "sine.out",
      scrollTrigger: {
        trigger: "#wrapper",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }, []);
  */

  return (
    /*
    <div className="relative scroll-smooth">
      <div className="h-[100svh]">
        <Hero />
      </div>

      <div id="wrapper" className="absolute top-[100vh] left-0 w-full z-20">
        {isDesktop ? (
          <>
            <StickySection>
              <Opening />
            </StickySection>
            <StickySection>
              <CardsMaze />
            </StickySection>
            <StickySection>
              <Info />
            </StickySection>
            <Footer />
          </>
        ) : (
          <div className="relative h-full">
            <div className="sticky top-0">
              <Opening />
              <CardsMaze />
              <Info />
              <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
    */
    <div className="relative scroll-smooth">
      <Hero />
      <Opening />
      <CardsMaze>
        <CardsMazeServer />
      </CardsMaze>
      <Info />
      <Footer />
    </div>
  );
}
