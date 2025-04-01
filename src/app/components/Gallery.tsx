"use client";

import gsap from "gsap";
import { useState } from "react";

import Image from "next/image";

const cards = [
  {
    id: 0,
    title: "Горный пейзаж",
    imageUrl: "/images/tests/1.jpg",
  },
  {
    id: 1,
    title: "Морской берег",
    imageUrl: "/images/tests/2.jpg",
  },
  {
    id: 2,
    title: "Лесная тропа",
    imageUrl: "/images/tests/3.jpg",
  },
  {
    id: 3,
    title: "Городской вид",
    imageUrl: "/images/tests/4.jpg",
  },
  {
    id: 4,
    title: "Пустынный оазис",
    imageUrl: "/images/tests/5.jpg",
  },
  {
    id: 5,
    title: "Зимний лес",
    imageUrl: "/images/tests/6.jpg",
  },
  {
    id: 6,
    title: "Водопад",
    imageUrl: "/images/tests/7.jpg",
  },
];

export default function Gallery() {
  const [isClicked, setClicked] = useState<null | Number>(null);

  {
    /*
    const handleWheel = (e: React.WheelEvent) => {
    const scrollAmount = e.deltaY > 0 ? 200 : -200;
    e.currentTarget.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
    */
  }

  const handleClick = (index: number) => {
    setClicked(index);
    gsap.to(".card", {
      scale: (i) => (i === index ? 1.05 : 0.9),
      opacity: (i) =>
        i === index
          ? 1
          : index > i
          ? 1 / (2 * (index - i))
          : 1 / (2 * (i - index)),
      x: (i) => (index - i >= 1 ? -80 : i - index >= 1 ? 80 : 0),
      duration: 0.2,
      ease: "circ.out",
    });

    gsap.to(".title-block", {
      opacity: (i) => (i === index ? 1 : 0),
      duration: 0.2,
      ease: "circ.out",
    });
    gsap.to(".image", {
      scale: (i) => (i === index ? 1.1 : 1),
      duration: 0.2,
      ease: "circ.out",
    });
  };

  const handleMouseLeave = () => {
    setClicked(null);
    gsap.to(".card", {
      scale: 1,
      opacity: 1,
      x: 0,
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

  return (
    <div className="w-full h-screen bg-[var(--darkcyan)] flex gap-12 items-center justify-center">
      <button className="relative w-12 h-12 rounded-full border-white border-2 cursor-pointer">
        <Image src="/images/icons/arrow.png" alt="" className="p-2" fill />
      </button>
      <div
        //onWheel={handleWheel}
        className="w-2/3 h-96 
        touch-pan-x snap-x snap-mandatory
        flex items-center 
        overflow-x-auto scroll-smooth
        [scrollbar-width:none] /* Firefox */
        [-ms-overflow-style:none]  /* IE/Edge */
        [&::-webkit-scrollbar]:hidden  /* Chrome/Safari */"
      >
        {cards.map((i) => (
          <div
            key={i.id}
            className={`card snap-center basis-1/1 lg:basis-1/5 flex-shrink-0 px-2`}
            onClick={() => handleClick(i.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`${
                i.id == isClicked ? "shadow-lg shadow-black/60" : ""
              } relative h-64 text-center
              border-white border-2 rounded-xl
              flex items-center justify-center 
              overflow-hidden`}
            >
              <Image
                src={i.imageUrl}
                alt=""
                fill
                className="image rounded-xl object-cover" //bg-gradient-to-b from-black/60 to-transparent
              />

              <button className="title-block absolute w-full h-1/2 bottom-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 cursor-pointer">
                <h2 className="text-xl text-white mb-4">{i.title}</h2>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="relative w-12 h-12 rounded-full border-white border-2 cursor-pointer">
        <Image
          src="/images/icons/arrow.png"
          alt=""
          className="p-2 rotate-180"
          fill
        />
      </button>
    </div>
  );
}
