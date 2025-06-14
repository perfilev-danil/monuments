import Image from "next/image";

import Header from "./Header";

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
              приенисейских земель: <br /> Красноярского края, <br /> Хакасии и
              Тывы
            </p>
          </div>
          <p className=" leading-relaxed">
            Описание <br />
            50+ объектов
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center lg:justify-between z-20">
        <span className="hidden lg:block">ensib</span>
        <span className="font-american text-center text-[20px]">
          ensib-monuments
        </span>
        <div className="hidden lg:block">
          <p className="text-white text-right">Трансформация</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[60%] lg:w-[30%] h-full">
        <Image
          src="/images/contents/opening.png"
          alt=""
          fill
          className="relative object-contain object-right-bottom"
        />
      </div>
    </div>
  );
}
