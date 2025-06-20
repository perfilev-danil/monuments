import Image from "next/image";
import Link from "next/link";

export default function Collection({ monuments }: { monuments: any }) {
  return (
    <div
      className="h-full w-full p-4 lg:p-8 "
      style={{ border: "1px solid black" }}
    >
      {/* LIST */}
      <div className="h-full lg:w-full flex flex-wrap gap-4 lg:gap-8 overflow-y-auto snap-y snap-mandatory overflow-x-hidden scroll-smooth pretty-scrollbar">
        {monuments?.length > 0 ? (
          monuments?.map((monument: any) => (
            <div
              key={monument.id}
              className="relative snap-start overflow-hidden h-full w-full lg:w-[calc(50%-32px)] "
              style={{ border: "1px solid black" }}
            >
              {monument.images?.[0] && (
                <Image
                  src={`/api/images/${monument?.images[0]?.id}`}
                  alt=""
                  fill
                  sizes="(max-width: 300px) 40vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-cover hover:scale-110 transition-transform object-top duration-500"
                  loading="lazy"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 w-full bg-[var(--dark)] flex justify-between p-2 ">
                <div className=" bg-opacity-50 text-white text-center p-2 truncate">
                  {monument?.appellation_monument?.value} (
                  {monument?.year?.value} г. )
                </div>

                <Link
                  href={`/monuments/${monument?.id}`}
                  className="relative w-10 h-10 shrink-0  rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                  style={{ border: "1px solid white" }}
                >
                  <Image
                    src="/images/icons/arrow.png"
                    alt=""
                    className="p-2"
                    fill
                    sizes="(max-width: 300px) 60vw"
                    style={{ transform: "rotate(180deg)" }}
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="m-auto font-american">
            <p className="">Ничего не найдено ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
