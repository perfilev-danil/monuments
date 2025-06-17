"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CardsMaze({
  initialMonuments,
}: {
  initialMonuments: any[];
}) {
  const [monuments, setMonuments] = useState<any[]>(initialMonuments);
  const [isLoading, setIsLoading] = useState(false);
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

  /*
  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await fetch("/api/monumentsCards");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке памятников");
        }
        const data = await response.json();
        setMonuments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMonuments();
  }, []);
  */

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

/*"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Card {
  height?: number;
  name?: string;
  url?: string | undefined;
}

interface CardsInColumn {
  id: number;
  cards: Card[];
}

export default function CardsMaze() {
  const [monuments, setMonuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsCollection, setCardsCollection] = useState<CardsInColumn[]>([]);
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
    const fetchMonuments = async () => {
      try {
        const response = await fetch("/api/monumentsCards");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке памятников");
        }
        const data = await response.json();
        setMonuments(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      }
    };

    fetchMonuments();
  }, []);

  useEffect(() => {
    setLoading(true);

    let columnId = 0;
    let cardsAmount = monuments.length;
    const generatedCardsInColumn: CardsInColumn[] = [];

    let index = 0;
    while (cardsAmount > 0) {
      let cardsHolder: any[] = [];

      let cardsInColumn = Math.floor(Math.random() * 2) + 1;

      if (cardsAmount - cardsInColumn === -1) {
        cardsInColumn = 1;
      } else if (cardsAmount - cardsInColumn === -2) {
        cardsInColumn = 1;
      }

      const maxHeight = 100;
      let sumHeight = 0;
      let height = 0;

      for (let i = 0; i < cardsInColumn; i++) {
        if (i === cardsInColumn - 1) {
          height = maxHeight - sumHeight;
        } else {
          height = (Math.ceil(Math.random() * 10) + 20) * 2;
          sumHeight += height;
        }
        cardsHolder.push({
          height: height,
          id: monuments[index]?.id,
          appellation_monument: monuments[index]?.appellation_monument?.value,
          year: monuments[index]?.year?.value,
          src: monuments[index]?.images[0]?.id,
        });
        index += 1;
      }

      const cardsToAdd = cardsHolder.splice(0, cardsInColumn);

      generatedCardsInColumn.push({
        id: columnId++,
        cards: cardsToAdd,
      });

      cardsAmount -= cardsInColumn;
    }

    setCardsCollection(generatedCardsInColumn);
    setLoading(false);
  }, [monuments]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = "default";
      setShowHint(false);
    };

    const onMouseEnter = () => {
      setShowHint(true);
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

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-[var(--dark)] h-[100svh]">
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
            <Image src="/images/icons/arrow.png" alt="" className="p-2" fill />
          </div>
          <div
            className="w-20 h-20 flex items-center justify-center p-2 bg-[var(--dark)] rounded-full"
            style={{ border: "1px solid white" }}
          >
            <p className="text-white text-center font-american">
              Зажми <br />и тяни
            </p>
          </div>

          <div className="relative w-10 h-10">
            <Image
              src="/images/icons/arrow.png"
              alt=""
              className="p-2 rotate-180"
              fill
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white text-center font-american">
            Загрузка ...
          </span>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto no-scrollbar flex p-2 lg:p-4 
        snap-x snap-mandatory scroll-smooth select-none lg:cursor-grab z-20 relative"
        >
          {cardsCollection.map((column) => (
            <div
              key={column?.id}
              className="flex-shrink-0 w-full lg:basis-1/3 card snap-center"
            >
              {column?.cards.map((monument: any) => (
                <div
                  key={monument?.id}
                  className="p-2 lg:p-4"
                  style={{ height: `${monument.height}%` }}
                >
                  <div
                    className="relative overflow-hidden  h-full group"
                    style={{ border: "1px solid white" }}
                  >
                    <div className="">
                      <div className="absolute bottom-0 right-0 z-10 bg-white w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <p className="w-full text-left truncate">
                            {monument?.appellation_monument} ({monument?.year}{" "}
                            г.)
                          </p>
                          <Link
                            href={`/monuments/${monument.id}`}
                            className="relative w-10 h-10 shrink-0  rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                            style={{ border: "1px solid black" }}
                          >
                            <Image
                              src="/images/icons/arrow-b.png"
                              alt=""
                              className="p-2 rotate-180"
                              fill
                            />
                          </Link>
                        </div>
                      </div>
                      {monument?.src && (
                        <Image
                          src={`/api/images/${monument?.src}`}
                          alt=""
                          fill
                          draggable={false}
                          className="object-cover group-hover:scale-110 transition-transform object-top duration-500"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
*/
