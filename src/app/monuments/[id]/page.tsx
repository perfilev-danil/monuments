import { notFound } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import Header from "@/app/components/Header";
import { CardsScroller } from "@/app/components/CardsScroller";
import Footer from "@/app/components/Footer";

export default async function MonumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let monument: any = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/monuments/${id}`
    );

    if (!response.ok) {
      return notFound();
    }

    monument = await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке памятника:", error);
    return notFound();
  }

  if (!monument) {
    return notFound();
  }

  return (
    <div>
      <div className=" lg:h-[calc(100vh-32px)] p-4 lg:p-8 pb-0 lg:pb-0 flex flex-col gap-4 lg:gap-8">
        <Header />

        {/* Info */}
        <div className="h-full flex flex-col gap-4 lg:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl">
              {monument?.appellation_monument?.value} ({monument?.year?.value}{" "}
              г.)
            </h1>
            <Link
              href={"/collection"}
              className="relative w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
              style={{ border: "1px solid black" }}
            >
              <Image
                src="/images/icons/arrow-b.png"
                alt="Назад"
                fill
                className="p-2"
              />
            </Link>
          </div>

          <div className="h-full w-full flex flex-col lg:flex-row lg:gap-8">
            {/* 1st col */}
            <div className="lg:w-1/2 p-4 pb-0 lg:p-8 flex flex-col gap-4 custom-border-bottom">
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Год</span>
                <p className="col-span-4 lg:col-span-5">
                  {monument?.year?.value}
                </p>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Период</span>
                <p className="col-span-4 lg:col-span-5">
                  {monument?.period?.value}
                </p>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Цвета</span>
                <div className="col-span-4 lg:col-span-5 flex items-center gap-4">
                  {monument?.colors?.map((color: any) => (
                    <span
                      key={color?.id}
                      style={{ backgroundColor: `#${color.code}` }}
                      className="w-4 h-4 rounded-full"
                    ></span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Материалы</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.materials?.map((material: any) => (
                    <p key={material?.id}>{material?.value}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Техники</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.techniques?.map((technique: any) => (
                    <p key={technique?.id}>{technique?.value}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Символы</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.marks?.map((mark: any) => (
                    <p key={mark?.id}>{mark?.value}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Размеры</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.dimensions?.map((dimension: any) => (
                    <p key={dimension?.id}>
                      {dimension?.dimension_type?.value} - {dimension?.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6 items-end">
                <span className="col-span-2 lg:col-span-1">
                  Населённый пункт
                </span>
                <p className="col-span-4 lg:col-span-5">
                  {monument?.place?.appellation_place?.value}
                </p>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Адрес</span>
                <div className="flex col-span-4 lg:col-span-5 items-center gap-2">
                  <p className="">
                    {monument?.place?.appellation_address?.value}
                  </p>
                  {monument?.place?.information_object_place?.value && (
                    <Link
                      href={monument?.place?.information_object_place?.value}
                      className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Личности</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.personalities?.map((personality: any) => (
                    <div
                      key={personality?.id}
                      className="flex items-center gap-2"
                    >
                      <p>
                        {personality?.appellation_personality?.value} -{" "}
                        {personality?.role?.value}
                      </p>
                      {personality?.information_object_personality?.value && (
                        <Link
                          href={
                            personality?.information_object_personality?.value
                          }
                          className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                        >
                          <Image src="/images/icons/link.png" alt="" fill />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* 2nd col */}
            <div className="lg:w-1/2 custom-border-top p-4 lg:p-8 flex flex-col gap-4">
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Описание</span>
                <p className="col-span-4 lg:col-span-5 text-justify">
                  {monument?.description_monument?.value}
                </p>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Надпись</span>
                <p className="col-span-4 lg:col-span-5 text-justify">
                  {monument?.inscription?.value}
                </p>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Мемориал</span>
                <p className="col-span-4 lg:col-span-5 text-justify">
                  {monument?.conceptual_object?.value}
                </p>
              </div>
              <div className="grid grid-cols-6 items-end">
                <span className="col-span-2 lg:col-span-1">Источник</span>
                <div className="flex items-center gap-2">
                  <p className="col-span-4 lg:col-span-5 text-justify">
                    {monument?.appellation_info?.value}
                  </p>
                  {monument?.appellation_info?.information_object_info
                    ?.value && (
                    <Link
                      href={
                        monument?.appellation_info?.information_object_info
                          ?.value
                      }
                      className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-6 items-end">
                <span className="col-span-2 lg:col-span-1">Гос. реестр</span>
                <div className="flex items-center gap-2">
                  <p className="col-span-4 lg:col-span-5 text-justify">
                    {monument?.appellation_registry?.value}
                  </p>
                  {monument?.appellation_registry?.information_object_registry
                    ?.value && (
                    <Link
                      href={
                        monument?.appellation_registry
                          ?.information_object_registry?.value
                      }
                      className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">Документы</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.documents?.map((document: any) => (
                    <div key={document?.id} className="flex items-center gap-2">
                      <p>{document?.value}</p>
                      {document?.information_object_document?.value && (
                        <Link
                          href={document?.information_object_document?.value}
                          className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                        >
                          <Image src="/images/icons/link.png" alt="" fill />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-6">
                <span className="col-span-2 lg:col-span-1">События</span>
                <div className="col-span-4 lg:col-span-5">
                  {monument?.events?.map((event: any) => (
                    <div key={event?.id} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <p>
                          {event?.time_span?.beginning} -{" "}
                          {event?.time_span?.end}
                        </p>
                        <p>{event?.appellation_event.value}</p>
                      </div>
                      {event?.information_object_event?.value && (
                        <Link
                          href={event.information_object_event.value}
                          className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                        >
                          <Image src="/images/icons/link.png" alt="" fill />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Images */}
      {monument.images.length !== 0 && (
        <div className="relative h-[140vh]">
          <div className="sticky top-0">
            {/*
                    <Gallery />
                    */}

            <CardsScroller images={monument.images} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
