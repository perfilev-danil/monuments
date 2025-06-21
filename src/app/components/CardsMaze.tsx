// pages/cards-maze.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/monumentsCards`);
  if (!res.ok) {
    return {
      props: {
        monuments: [],
        error: true,
      },
    };
  }

  const monuments = await res.json();

  return {
    props: {
      monuments,
      error: false,
    },
  };
}

export default function CardsMaze({ monuments }: { monuments: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseEnter = () => setShowHint(true);
    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = "default";
      setShowHint(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };
    const onMouseUp = () => {
      isDown = false;
      container.style.cursor = "default";
    };
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDesktop]);

  return (
    <div className="relative bg-[var(--dark)] h-[620px] md:h-[900px] lg:h-screen w-full p-4 lg:p-8 select-none">
      {showHint && isDesktop && (
        <div
          className="fixed z-50 flex items-center pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            transition: "transform 0.05s linear",
          }}
        >
          <div className="relative w-10 h-10">
            <Image
              src="/images/icons/arrow-b.png"
              alt=""
              className="p-2"
              fill
              sizes="(max-width: 768px) 60vw"
              loading="lazy"
            />
          </div>
          <div
            className="w-20 h-20 flex items-center justify-center p-2 bg-white rounded-full"
            style={{ border: "1px solid black" }}
          >
            <p className="text-black text-center font-american">
              Зажми <br />и тяни
            </p>
          </div>
          <div className="relative w-10 h-10">
            <Image
              src="/images/icons/arrow-b.png"
              alt=""
              className="p-2 rotate-180"
              fill
              sizes="(max-width: 768px) 60vw"
            />
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar h-full w-full flex items-center gap-4 lg:gap-8 snap-x snap-mandatory cursor-grab scroll-smooth"
      >
        {monuments.map((monument: any) => (
          <div
            key={monument.id}
            className="h-full snap-end w-full lg:w-[calc(25%-24px)] shrink-0"
          >
            <div
              className="relative overflow-hidden h-full select-none"
              style={{ border: "1px solid black" }}
            >
              <Image
                src={
                  monument?.images.length === 0
                    ? `/images/contents/noimage.jpg`
                    : `/api/images/${monument?.images[0]?.id}`
                }
                alt=""
                fill
                sizes="(max-width: 300px) 40vw, (max-width: 1200px) 60vw, 50vw"
                draggable={false}
                className="object-cover object-top hover:scale-110 transition-transform duration-300"
              />
              <div
                className="absolute bg-white bottom-0 left-0 right-0 w-full flex justify-between p-2"
                style={{ border: "1px solid black" }}
              >
                <div className="text-center p-2 truncate">
                  {monument?.appellation_monument?.value} (
                  {monument?.year?.value} г. )
                </div>

                <Link
                  href={`/monuments/${monument?.id}`}
                  className="relative w-10 h-10 shrink-0 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid black" }}
                >
                  <Image
                    src="/images/icons/arrow-b.png"
                    alt=""
                    className="p-2"
                    fill
                    sizes="(max-width: 768px) 60vw"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export default function CardsMaze() {
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const {
    data: monuments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["monuments"],
    queryFn: async () => {
      const response = await fetch("/api/monumentsCards");
      if (!response.ok) throw new Error("Ошибка при загрузке памятников");
      return response.json();
    },
    staleTime: 24 * 60 * 60 * 1000,
    refetchInterval: 2 * 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!isDesktop) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseEnter = () => {
      setShowHint(true);
    };

    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = "default";
      setShowHint(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      isDown = false;
      container.style.cursor = "default";
    };

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDesktop]);

  return (
    <div className="relative bg-[var(--dark)] h-[620px] md:h-[900px] lg:h-screen w-full p-4 lg:p-8 select-none">
      {isLoading && (
        <div className="h-full w-full flex items-center justify-center">
          <span className="text-white text-center font-american">
            Загрузка ...
          </span>
        </div>
      )}
      {showHint && isDesktop && !isLoading && (
        <div
          className="fixed z-50 flex items-center pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            transition: "transform 0.05s linear",
          }}
        >
          <div className="relative w-10 h-10">
            <Image
              src="/images/icons/arrow-b.png"
              alt=""
              className="p-2"
              fill
              sizes="(max-width: 768px) 60vw"
              loading="lazy"
            />
          </div>
          <div
            className="w-20 h-20 flex items-center justify-center p-2  bg-white rounded-full"
            style={{ border: "1px solid black" }}
          >
            <p className="text-black text-center font-american">
              Зажми <br />и тяни
            </p>
          </div>

          <div className="relative w-10 h-10">
            <Image
              src="/images/icons/arrow-b.png"
              alt=""
              className="p-2 rotate-180"
              fill
              sizes="(max-width: 768px) 60vw"
            />
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar h-full w-full flex items-center gap-4 lg:gap-8 snap-x snap-mandatory cursor-grab scroll-smooth"
      >
        {!isLoading &&
          monuments?.map((monument: any) => (
            <div
              key={monument.id}
              className="h-full snap-end w-full lg:w-[calc(25%-24px)] shrink-0"
            >
              <div
                className="relative overflow-hidden h-full select-none"
                style={{ border: "1px solid black" }}
              >
                <Image
                  src={
                    monument?.images.length === 0
                      ? `/images/contents/noimage.jpg`
                      : `/api/images/${monument?.images[0]?.id}`
                  }
                  alt=""
                  fill
                  sizes="(max-width: 300px) 40vw, (max-width: 1200px) 60vw, 50vw"
                  draggable={false}
                  className="object-cover object-top hover:scale-110 transition-transform duration-300"
                />
                <div
                  className="absolute bg-white bottom-0 left-0 right-0 w-full flex justify-between p-2"
                  style={{ border: "1px solid black" }}
                >
                  <div className="text-center p-2 truncate">
                    {monument?.appellation_monument?.value} (
                    {monument?.year?.value} г. )
                  </div>

                  <Link
                    href={`/monuments/${monument?.id}`}
                    className="relative w-10 h-10 shrink-0 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                    style={{ border: "1px solid black" }}
                  >
                    <Image
                      src="/images/icons/arrow-b.png"
                      alt=""
                      className="p-2"
                      fill
                      sizes="(max-width: 768px) 60vw"
                      style={{ transform: "rotate(180deg)" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}


*/
