import Image from "next/image";
import Link from "next/link";

export default function Collection({ monuments }: { monuments: any }) {
  return (
    <div className="h-full w-full p-8  border-black border-1">
      {/* LIST */}
      <div className="h-full w-full flex flex-wrap gap-8 overflow-y-auto overflow-x-hidden scroll-smooth pretty-scrollbar">
        {monuments.length > 0 ? (
          monuments.map((monument: any) => (
            <div
              key={monument.id}
              className="relative overflow-hidden h-full w-[calc(50%-32px)] border-1"
            >
              {monument.images?.[0] && (
                <Image
                  src={`/api/images/${monument?.images[0]?.id}`}
                  alt=""
                  fill
                  objectFit="cover"
                  className="hover:scale-110 transition-transform object-top duration-500"
                  //unoptimized
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 w-full bg-[var(--dark)] flex justify-between p-2">
                <div className=" bg-opacity-50 text-white text-center p-2">
                  {monument?.appellation_monument?.value} (
                  {monument?.year?.value} г. )
                </div>

                {/*
                <button
                    onClick={() => router.push(`/monuments/${monument.id}`)}
                    className="relative w-10 h-10 shrink-0 border-1 border-white rounded-full cursor-pointer"
                  >
                    <Image
                      src="/images/icons/arrow.png"
                      alt=""
                      className="p-2 rotate-180"
                      fill
                    />
                    </button>
                */}

                <Link
                  href={`/monuments/${monument.id}`}
                  className="relative w-10 h-10 shrink-0 border-1 border-white rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Image
                    src="/images/icons/arrow.png"
                    alt=""
                    className="p-2 rotate-180"
                    fill
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
