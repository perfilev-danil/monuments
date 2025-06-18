//import CardsMaze from "./CardsMaze";
import CardsServer from "../../../lib/CardsServer";
import Image from "next/image";
import Link from "next/link";

export default async function CardsMazeServer() {
  const monuments = await CardsServer();

  return (
    <>
      {monuments?.map((monument: any) => (
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
                {monument?.appellation_monument?.value} ({monument?.year?.value}{" "}
                г. )
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
    </>
  );
}
