"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const router = useRouter();

  const [monuments, setMonuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cardsCollection, setCardsCollection] = useState<CardsInColumn[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/monumentsCards");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке памятников");
        }
        const data = await response.json();
        setMonuments(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  useEffect(() => {
    let columnId = 0;
    let cardsAmount = monuments.length;
    const generatedCardsInColumn: CardsInColumn[] = [];

    let index = 0;
    while (cardsAmount > 0) {
      let cardsHolder: any[] = [];

      let cardsInColumn = Math.ceil(Math.random() * 2) + 1;

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
          height = (Math.ceil(Math.random() * 10) + 10) * 2;
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

      cardsHolder.splice(0, cardsHolder.length);

      cardsAmount -= cardsInColumn;
    }

    setCardsCollection(generatedCardsInColumn);
  }, [monuments]);

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

  const getImageUrl = (imageId: number) => {
    return `/api/images/${imageId}`;
  };

  return (
    <div className="relative bg-[var(--darkcyan)] h-screen">
      {isAtStart && (
        <div className="absolute bg-gradient-to-r from-black to-transparent h-full w-1/4 top-0 left-0 transition-opacity duration-500 opacity-30"></div>
      )}
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-hidden no-scrollbar flex p-4 
        touch-pan-x snap-x snap-mandatory scroll-smooth select-none cursor-grab z-20 relative"
      >
        {cardsCollection.map((column) => (
          <div
            key={column?.id}
            className="flex-shrink-0 basis-1/3
          card snap-center"
          >
            {column?.cards.map((monument: any) => (
              <div
                key={monument?.id}
                className="p-4"
                style={{ height: `${monument.height}%` }}
              >
                <div className="relative overflow-hidden border-1 border-white h-full group">
                  <div className="">
                    <div className="absolute bottom-0 right-0 z-10 bg-white w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between">
                        <p className="w-full text-left truncate">
                          {monument?.appellation_monument} ({monument?.year})
                        </p>
                        <button
                          onClick={() =>
                            router.push(`/monuments/${monument.id}`)
                          }
                          className="relative w-10 h-10 shrink-0 border-1 border-black rounded-full cursor-pointer"
                        >
                          <Image
                            src="/images/icons/arrow-b.png"
                            alt=""
                            className="p-2 rotate-180"
                            fill
                          />
                        </button>
                      </div>
                    </div>
                    {monument?.src && (
                      <Image
                        src={getImageUrl(monument?.src)}
                        alt=""
                        fill
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform object-top duration-500"
                      />
                    )}
                  </div>
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
