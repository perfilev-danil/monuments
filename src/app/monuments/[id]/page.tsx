import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Monument {
  id: number;
  appellation: { value: string } | null;
  description: { value: string } | null;
}

export async function generateStaticParams() {
  return []; // Пустой массив, если ID неизвестны заранее
}

export default async function MonumentPage({
  params,
}: {
  params: { id: string };
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
      <div className="p-8 flex flex-col gap-8">
        <Header />

        <div className="grid gap-y-4 border-1 border-black p-8">
          <div className="grid grid-cols-10 items-baseline">
            <p>Название:</p>
            <h1 className="col-span-9">
              {" "}
              {monument?.appellation_monument?.value}
            </h1>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Год:</p>
            <p className="col-span-9">{monument?.year?.value}</p>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Период:</p>
            <p className="col-span-9">{monument?.period?.value}</p>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Материалы:</p>
            <div className="flex flex-col col-span-9">
              {monument?.materials?.map((material: any) => (
                <p key={material?.id}>{material?.value}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Цвета: </p>
            <div className="flex gap-4 col-span-9">
              {monument?.colors?.map((color: any) => (
                <span
                  key={color?.id}
                  style={{ backgroundColor: `#${color.code}` }}
                  className="w-4 h-4 rounded-full"
                ></span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Размеры: </p>
            <div className="flex flex-col col-span-9">
              {monument?.dimensions?.map((dimension: any) => (
                <p key={dimension?.id}>
                  {dimension?.dimension_type?.value} – {dimension?.value}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Техника: </p>
            <div className="flex flex-col col-span-9">
              {monument?.techniques?.map((technique: any) => (
                <p key={technique?.id}>{technique?.value}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-end">
            <p>Мемориальное значение:</p>
            <p className="col-span-9">{monument?.conceptual_object?.value}</p>
          </div>

          <div className="grid grid-cols-10 items-end">
            <p>Надпись на табличке:</p>
            <p className="col-span-9">{monument?.inscription?.value}</p>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Город:</p>
            <p className="col-span-9">
              {monument?.place?.appellation_place?.value}
            </p>
          </div>
          <div className="grid grid-cols-10 items-baseline">
            <p>Адрес:</p>
            <div className="flex items-center gap-2">
              <p className="col-span-9">
                {monument?.place?.appellation_address?.value}
              </p>
              {monument?.place?.information_object_place?.value ? (
                <Link
                  href={monument?.place?.information_object_place?.value}
                  className="relative w-4 h-4 cursor-pointer shrink-0"
                >
                  <Image src="/images/icons/link.png" alt="" fill />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-10 items-baseline">
            <p>Координаты:</p>
            <p className="col-span-9">
              {monument?.place?.appellation_address?.coordinates?.value}
            </p>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Личности: </p>
            <div className="flex flex-col col-span-9">
              {monument?.personalities?.map((personality: any) => (
                <div key={personality?.id} className="flex items-center gap-2">
                  <p>
                    {personality?.role?.value} –{" "}
                    {personality?.appellation_personality?.value}
                  </p>
                  {personality?.information_object_personality?.value ? (
                    <Link
                      href={personality?.information_object_personality?.value}
                      className="relative w-4 h-4 cursor-pointer shrink-0"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>События: </p>
            <div className="flex flex-col col-span-9">
              {monument?.events?.map((event: any) => (
                <div key={event?.id} className="flex items-center gap-2">
                  <p>
                    {event?.time_span?.beginning}
                    {event?.time_span?.end
                      ? " – " + event?.time_span?.end + " "
                      : " "}
                    – {event?.appellation_event?.value}
                  </p>

                  {event?.information_object_event?.value ? (
                    <Link
                      href={event?.information_object_event?.value}
                      className="relative w-4 h-4 cursor-pointer shrink-0"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-end">
            <p>
              Номер <br /> в реестре:
            </p>
            <div className="flex items-center gap-2">
              <p className="col-span-9">
                {monument?.appellation_registry?.value}
              </p>
              {monument?.appellation_registry?.information_object_registry
                ?.value ? (
                <Link
                  href={
                    monument?.appellation_registry?.information_object_registry
                      ?.value
                  }
                  className="relative w-4 h-4 cursor-pointer shrink-0"
                >
                  <Image src="/images/icons/link.png" alt="" fill />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="grid grid-cols-10 items-end">
            <p>Служба по гос. охране ОКН</p>
            <div className="flex items-center gap-2">
              <p className="col-span-9">Ссылка</p>
              {monument?.information_object_okn?.value ? (
                <Link
                  href={monument?.information_object_okn?.value}
                  className="relative w-4 h-4 cursor-pointer shrink-0"
                >
                  <Image src="/images/icons/link.png" alt="" fill />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Документы: </p>
            <div className="flex flex-col col-span-9">
              {monument?.documents?.map((document: any) => (
                <div key={document?.id} className="flex items-center gap-2">
                  <p>{document?.value}</p>
                  {document?.information_object_document?.value ? (
                    <Link
                      href={document?.information_object_document?.value}
                      className="relative w-4 h-4 cursor-pointer shrink-0"
                    >
                      <Image src="/images/icons/link.png" alt="" fill />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-10 items-baseline">
            <p>Описание:</p>
            <p className="col-span-9">
              {monument?.description_monument?.value}
            </p>
          </div>
        </div>

        {monument.images.length === 0 ? (
          ""
        ) : (
          <div
            className="w-full
            flex items-center justify-center gap-4"
          >
            <button
              className={`relative w-12 h-12 rounded-full border-black border-1 cursor-pointer shrink-0`}
            >
              <Image
                src="/images/icons/arrow.png"
                alt=""
                className="p-2"
                fill
              />
            </button>
            <div
              className="w-full h-96 
                          touch-pan-x snap-x snap-mandatory
                          flex items-center 
                          overflow-x-auto scroll-smooth"
            >
              {monument.images.map((image: any, index: any) => (
                <div
                  key={monument?.id}
                  className={`card snap-center basis-1/1 lg:basis-1/5 flex-shrink-0 px-4`}
                >
                  <div className="relative h-64 border-1 border-black">
                    <Image
                      src={`/api/monumentsImages/${image?.id}`}
                      alt=""
                      fill
                      className="image object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              className={`relative w-12 h-12 rounded-full border-black border-1 cursor-pointer shrink-0`}
            >
              <Image
                src="/images/icons/arrow.png"
                alt=""
                className="p-2"
                fill
              />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/*

        <div className="flex gap-8">
          <p>Год:</p>
          <p>{monument.year?.value}</p>
        </div>

include: {
        appellation: true,
        description: true,
        year: true,
        materials: true,
        colors: true,
        periods: true,
        images: true,
        appellation_registry: true,
        inscription: true,
        conceptual_object: true,
        documents: true,
        dimensions: {
          include: {
            dimension_type: true,
          },
        },
        personalities: {
          include: {
            appellation: true,
            description: true,
            time_span: true,
            role: true,
          },
        },
        place: {
          include: {
            coordinates: true,
          },
        },
        events: {
          include: {
            appellation: true,
            description: true,
            time_span: true,
          },
        },
      },
      
*/
