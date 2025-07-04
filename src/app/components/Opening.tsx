import Header from "./Header";
import Image from "next/image";
import Link from "next/link";

export default function Opening() {
  return (
    <div className="relative bg-white w-full h-[620px] md:h-[900px] lg:h-screen flex flex-col justify-between p-4 lg:p-8 text-base">
      <Header />
      <div className="h-[80%] lg:h-[70%] flex items-center">
        <div className="bg-black h-full w-[1px]"></div>
        <div className="h-full flex flex-col justify-between pl-4 lg:pl-20">
          <div className="flex flex-col gap-8">
            <h2 className="text-[26px] lg:text-4xl leading-normal">
              Навигатор по монументам <br /> Енисейской Сибири
            </h2>
            <p className=" leading-relaxed">
              Проект представляет цифровое собрание <br /> памятников
              Красноярского края, <br /> Хакасии и Тывы
            </p>
          </div>
          <p className=" leading-relaxed">
            Описание <br />
            50+ объектов
          </p>
        </div>
      </div>
      <div className="relative h-[20px] flex items-center lg:justify-between">
        <Link
          href={"https://siberiana.online/"}
          className="hidden lg:block z-10"
        >
          Сибириана
        </Link>
        <span className="absolute bottom-0 left-0 right-0 inset-0 font-american text-center text-[20px]">
          ensib-monuments
        </span>
        <Link
          href={"https://dashi-art.com/gallery/monuments/trans"}
          className="hidden lg:block text-white text-right z-10"
        >
          Трансформация <br /> Даши Намдаков
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 w-[60%] lg:w-[30%] h-full">
        <Image
          src="/images/contents/opening.png"
          alt=""
          fill
          priority
          sizes="(max-width: 300px) 40vw, (max-width: 1200px) 60vw, 50vw"
          className="relative object-contain object-right-bottom"
        />
      </div>
    </div>
  );
}
