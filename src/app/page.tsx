//"use client";

import Hero from "./components/Hero";
import Opening from "./components/Opening";

import Info from "./components/Info";
import CardsMaze from "./components/CardsMaze";
import Footer from "./components/Footer";

//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//const queryClient = new QueryClient();

//import StickySection from "./components/StickySection";

//import { useState, useEffect } from "react";
//import gsap from "gsap";
//import { ScrollTrigger } from "gsap/ScrollTrigger";

//gsap.registerPlugin(ScrollTrigger);

async function getMonuments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`, {
    cache: "no-cache", // или "force-cache" для SSG
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const monuments = await getMonuments();
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
    //<QueryClientProvider client={queryClient}>
    <div className="relative scroll-smooth">
      <Hero />
      <Opening />
      <CardsMaze monuments={monuments} />
      <Info />
      <Footer />
    </div>
    //</QueryClientProvider>
  );
}
