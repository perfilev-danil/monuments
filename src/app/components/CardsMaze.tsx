"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Card {
  id: number;
  height?: number;
  name?: string;
  url?: string | undefined;
}

interface CardsInColumn {
  id: number;
  cards: Card[];
}

const images = [
  "/images/tests/1.jpg",
  "/images/tests/2.jpg",
  "/images/tests/3.jpg",
  "/images/tests/4.jpg",
  "/images/tests/5.jpg",
  "/images/tests/6.jpg",
];

const libs: Card[] = [
  { id: 0, name: "Памятник 1890 г.", url: "/images/tests/1.jpg" },
  { id: 1, name: "Памятник памятник", url: "/images/tests/1.jpg" },
  {
    id: 2,
    name: "Памятник памятник Памятник памятник",
    url: "/images/tests/2.jpg",
  },
  { id: 3, name: "Памятник памятник", url: "/images/tests/3.jpg" },
  {
    id: 4,
    name: "Памятник памятник Памятник памятник",
    url: "/images/tests/4.jpg",
  },
  { id: 5, name: "Памятник памятник", url: "/images/tests/5.jpg" },
  {
    id: 6,
    name: "Памятник памятник Памятник памятник Памятник памятник",
    url: "/images/tests/6.jpg",
  },
  { id: 7, name: "Памятник памятник", url: "/images/tests/7.jpg" },
];

export default function CardsMaze() {
  const cardsCount = 7;
  const [cardsCollection, setCardsCollection] = useState<CardsInColumn[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    let columnId = 0;
    let cardsAmount = cardsCount;
    const generatedCardsInColumn: CardsInColumn[] = [];

    let index = 0;
    while (cardsAmount > 0) {
      let cardsHolder: Card[] = [];

      let cardsInColumn = Math.ceil(Math.random() * 2) + 1;

      const maxHeight = 100;
      let sumHeight = 0;
      let height = 0;

      for (let i = 0; i < cardsInColumn; i++) {
        if (i === cardsInColumn - 1) {
          height = maxHeight - sumHeight;
        } else {
          height = (Math.ceil(Math.random() * 10) + 10) * 2;
          sumHeight += height;
        }
        cardsHolder.push({
          id: index,
          height: height,
          name: libs[index]?.name,
          url: libs[index]?.url,
        });
        index += 1;
      }

      const cardsToAdd = cardsHolder.splice(0, cardsInColumn);

      generatedCardsInColumn.push({
        id: columnId++,
        cards: cardsToAdd,
      });

      cardsHolder.splice(0, cardsHolder.length);
      cardsAmount -= cardsInColumn;
    }

    setCardsCollection(generatedCardsInColumn);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setIsAtStart(scrollLeft <= 1);
      setIsAtEnd(scrollLeft >= maxScrollLeft - 10);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const onMouseLeave = () => {
      isDown = false;
      container.style.cursor = "default";
    };

    const onMouseUp = () => {
      isDown = false;
      container.style.cursor = "default";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1; // скорость прокрутки
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-[var(--darkcyan)] h-screen p-8">
      {isAtStart && (
        <div className="absolute bg-gradient-to-r from-black to-transparent h-full w-1/4 top-0 left-0 transition-opacity duration-500 opacity-30"></div>
      )}
      <div
        ref={scrollContainerRef}
        className="h-full border-1 border-white overflow-y-hidden no-scrollbar flex p-4 
        touch-pan-x snap-x snap-mandatory scroll-smooth select-none cursor-grab"
      >
        {cardsCollection.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 basis-1/3
          card snap-center"
          >
            {column.cards.map((card: Card) => (
              <div
                key={card.id}
                className="p-4"
                style={{ height: `${card.height}%` }}
              >
                <div className="relative overflow-hidden border-1 border-white h-full group">
                  {card?.url ? (
                    <div className="">
                      <div className="absolute bottom-0 right-0 z-10 bg-white w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/*
                        {card.id}
                        */}
                        <div className="flex items-center justify-between">
                          <p className="w-full text-left truncate">
                            {card?.name}
                          </p>
                          <button className="relative w-10 h-10 shrink-0 border-1 border-black rounded-full cursor-pointer">
                            <Image
                              src="/images/icons/arrow-b.png"
                              alt=""
                              className="p-2 rotate-180"
                              fill
                            />
                          </button>
                        </div>
                      </div>
                      <Image
                        src={card?.url}
                        alt=""
                        fill
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform object-top duration-500"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {isAtEnd && (
        <div className="absolute bg-gradient-to-l from-black to-transparent h-full w-1/4 top-0 right-0 transition-opacity duration-500 opacity-30"></div>
      )}
    </div>
  );
}
