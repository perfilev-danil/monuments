"use client";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

import Image from "next/image";

export default function Gallery() {
  const [isIndexed, setIndex] = useState<null | Number>(null);
  const [isClicked, setClicked] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [monuments, setMonuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleClick = (index: number) => {
    setClicked(true);
    setIndex(index);
    gsap.to(".card", {
      scale: (i) => (i === index ? 1.1 : 1),
      opacity: (i) => (i === index ? 1 : 0.5),
      duration: 0.2,
      ease: "circ.out",
    });

    gsap.to(".image", {
      scale: (i) => (i === index ? 1.2 : 1),
      duration: 0.2,
      ease: "circ.out",
    });

    gsap.to(".title-block", {
      opacity: (i) => (i === index ? 1 : 0),
      duration: 0.2,
      ease: "circ.out",
    });
  };

  const handleMouseLeave = () => {
    setClicked(false);
    setIndex(null);
    gsap.to(".card", {
      scale: 1,
      opacity: 1,
      duration: 0.2,
      ease: "circ.out",
    });
    gsap.to(".title-block", {
      opacity: 0,
      duration: 0.2,
      ease: "circ.out",
    });
    gsap.to(".image", {
      scale: 1,
      duration: 0.2,
      ease: "circ.out",
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const res = await fetch("/api/monumentsGallery");
        const data = await res.json();
        setMonuments(data);
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div
      className="w-full h-screen bg-[var(--darkcyan)] p-8 
      flex flex-col items-center justify-center"
    >
      <div
        className="w-full
        flex items-center justify-center gap-4"
      >
        <button
          onClick={scrollLeft}
          className={`relative w-12 h-12 rounded-full border-white border-1 cursor-pointer shrink-0`}
        >
          <Image src="/images/icons/arrow.png" alt="" className="p-2" fill />
        </button>
        <div
          ref={scrollRef}
          className="w-full h-96 
          touch-pan-x snap-x snap-mandatory
          flex items-center 
          overflow-x-auto scroll-smooth
          [scrollbar-width:none] /* Firefox */
          [-ms-overflow-style:none]  /* IE/Edge */
          [&::-webkit-scrollbar]:hidden  /* Chrome/Safari */"
        >
          {monuments.map((monument, index) => (
            <div
              key={monument?.id}
              className={`card snap-center basis-1/1 lg:basis-1/5 flex-shrink-0 px-4`}
              onClick={() => handleClick(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`${
                  index == isIndexed ? "shadow-lg shadow-black/50" : ""
                } relative h-64 text-center
                  flex items-center justify-center 
                  overflow-hidden border-1 border-white`}
              >
                {monument?.images?.[0] ? (
                  <Image
                    src={`/api/images/${monument?.images[0]?.id}`}
                    alt=""
                    fill
                    className="image object-cover"
                  />
                ) : (
                  <Image
                    src="/images/contents/noimage.jpg" // Путь к вашему дефолтному изображению
                    alt="Нет изображения"
                    fill
                    className="image object-cover"
                    unoptimized
                  />
                )}

                <button className="title-block absolute w-full h-1/3 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/50 to-transparent opacity-0 cursor-pointer ">
                  <h2 className="font-leotaro text-base text-white mb-4">
                    {monument?.appellation_monument?.value || "Без названия"}
                  </h2>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className={`relative w-12 h-12 rounded-full border-white border-1 cursor-pointer shrink-0`}
        >
          <Image
            src="/images/icons/arrow.png"
            alt=""
            className="p-2 rotate-180"
            fill
          />
        </button>
      </div>
      <span className="text-white font-leotaro">1 / 17</span>
    </div>
  );
}
