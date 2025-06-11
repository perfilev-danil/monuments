"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  images: any[];
}

export const CardsScroller: React.FC<Props> = ({ images }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px — tailwind breakpoint для lg
    };

    checkScreenSize(); // начальная проверка
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
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
  }, []);

  /*
  useEffect(() => {
    setHasMounted(true);
  }, []);
  */

  return (
    <div className="relative h-screen w-full p-4 lg:p-8  select-none">
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
            />
          </div>
          <div className="w-20 h-20 flex items-center justify-center p-2 border border-black bg-white rounded-full">
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
            />
          </div>
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar h-full w-full flex items-center gap-4 lg:gap-8 snap-x snap-mandatory cursor-grab scroll-smooth"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="h-full snap-end w-full lg:w-[calc(50%-16px)] shrink-0"
          >
            <div className="relative overflow-hidden h-full border border-black select-none">
              <Image
                src={`/api/images/${image.id}`}
                alt=""
                fill
                draggable={false}
                className="object-cover object-top hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
