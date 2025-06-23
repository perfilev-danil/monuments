"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/app/components/Header";
import { CardsScroller } from "@/app/components/CardsScroller";
import Footer from "@/app/components/Footer";

export default function Monument({ monument }: { monument: any }) {
  return (
    <div>
      <div className="h-full p-4 lg:p-8 flex flex-col gap-4 lg:gap-8">
        <Header />

        {/* Info */}
        <div className="h-full flex flex-col gap-4 lg:gap-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            <Link
              href={"/collection"}
              className="relative w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shrink-0"
              style={{ border: "1px solid black" }}
            >
              <Image
                src="/images/icons/arrow-b.png"
                alt=""
                fill
                sizes="(max-width: 768px) 60vw"
                className="p-2"
                priority
              />
            </Link>
            <h1 className="truncate">
              {monument?.appellation_monument?.value}
            </h1>
          </div>

          <div className="h-full w-full flex flex-col lg:flex-row lg:gap-8">
            {/* 1st col */}
            <div className="lg:w-1/2 p-4 pb-0 lg:p-8 flex flex-col gap-4 custom-border-bottom">
              {monument?.year?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Год</span>
                  <p className="col-span-4 lg:col-span-5">
                    {monument?.year?.value}
                  </p>
                </div>
              )}
              {monument?.period?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Период</span>
                  <p className="col-span-4 lg:col-span-5">
                    {monument?.period?.value}
                  </p>
                </div>
              )}
              {monument?.colors?.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Цвета</span>
                  <div className="col-span-4 lg:col-span-5 flex items-center gap-4">
                    {monument?.colors?.map((color: any) => (
                      <span
                        key={color?.id}
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: `#${color.code}`,
                        }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
              {monument?.materials?.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Материалы</span>
                  <div className="col-span-4 lg:col-span-5">
                    {monument?.materials?.map((material: any) => (
                      <p key={material?.id}>{material?.value}</p>
                    ))}
                  </div>
                </div>
              )}
              {monument?.techniques?.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Техники</span>
                  <div className="col-span-4 lg:col-span-5">
                    {monument?.techniques?.map((technique: any) => (
                      <p key={technique?.id}>{technique?.value}</p>
                    ))}
                  </div>
                </div>
              )}
              {monument?.marks.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Символы</span>
                  <div className="col-span-4 lg:col-span-5">
                    {monument?.marks?.map((mark: any) => (
                      <p key={mark?.id}>{mark?.value}</p>
                    ))}
                  </div>
                </div>
              )}
              {monument?.place?.appellation_place?.value && (
                <div className="grid grid-cols-6 items-end">
                  <span className="col-span-2 lg:col-span-1">Нас. пункт</span>
                  <p className="col-span-4 lg:col-span-5">
                    {monument?.place?.appellation_place?.value}
                  </p>
                </div>
              )}
              {monument?.place?.appellation_address?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Адрес</span>
                  <div className="flex col-span-4 lg:col-span-5 items-center gap-2">
                    <p className="">
                      {monument?.place?.appellation_address?.value}
                    </p>
                  </div>
                </div>
              )}
              {monument?.personalities?.length > 0 && (
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
                            <Image
                              src="/images/icons/link.png"
                              alt=""
                              fill
                              sizes="(max-width: 768px) 60vw"
                            />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {monument?.conceptual_object?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Мемориал</span>
                  <p className="col-span-4 lg:col-span-5 text-justify">
                    {monument?.conceptual_object?.value}
                  </p>
                </div>
              )}
            </div>
            {/* 2nd col */}
            <div className="lg:w-1/2 custom-border-top p-4 lg:p-8 flex flex-col gap-4">
              {monument?.description_monument?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Описание</span>
                  <p className="col-span-4 lg:col-span-5 text-justify">
                    {monument?.description_monument?.value}
                  </p>
                </div>
              )}
              {monument?.inscription?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Надпись</span>
                  <p className="col-span-4 lg:col-span-5 text-justify">
                    {monument?.inscription?.value}
                  </p>
                </div>
              )}

              {monument?.appellation_info?.value && (
                <div className="grid grid-cols-6 items-end">
                  <span className="col-span-2 lg:col-span-1">Источник</span>
                  <div className="col-span-4 lg:col-span-5 flex items-center gap-2">
                    <p className="text-justify">
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
                        <Image
                          src="/images/icons/link.png"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 60vw"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
              {monument?.appellation_registry?.value && (
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
                        <Image
                          src="/images/icons/link.png"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 60vw"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
              {monument?.document?.value && (
                <div className="grid grid-cols-6">
                  <span className="col-span-2 lg:col-span-1">Документ</span>
                  <div className="col-span-4 lg:col-span-5 flex items-center gap-2">
                    <p>{monument?.document?.value}</p>
                    {monument?.document?.information_object_document?.value && (
                      <Link
                        href={
                          monument?.document?.information_object_document?.value
                        }
                        className="relative w-4 h-4 cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
                      >
                        <Image
                          src="/images/icons/link.png"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 60vw"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
              {monument?.events?.length > 0 && (
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
                            <Image
                              src="/images/icons/link.png"
                              alt=""
                              fill
                              sizes="(max-width: 768px) 60vw"
                            />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Images */}
        {monument?.images?.length !== 0 && (
          <CardsScroller images={monument?.images} />
        )}
      </div>

      <Footer />
    </div>
  );
}
