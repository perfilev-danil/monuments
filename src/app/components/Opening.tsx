import Image from "next/image";

import Header from "./Header";

export default function Opening() {
  return (
    <div className="relative bg-white w-full h-screen flex flex-col justify-between p-8">
      <Header />
      <div className="h-[70%] flex items-center">
        <div className="bg-black h-full w-[1px]"></div>
        <div className="h-full flex flex-col justify-between pl-20">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl leading-normal">
              Навигатор по монументам <br /> Енисейской Сибири
            </h2>
            <p className="text-base leading-relaxed">
              Проект представляет цифровое собрание <br /> памятников
              приенисейских земель: <br /> Красноярского края, <br /> Хакасии и
              Тывы
            </p>
          </div>
          <p className="text-base leading-relaxed">
            Подробное описание <br />
            50+ объектов
          </p>
        </div>
      </div>
      <div className="relative flex items-end justify-between z-20 text-sm">
        <span>ensib</span>
        <span className="absolute left-0 right-0 font-gogol text-center text-sm">
          ensib-monuments
        </span>
        <div>
          <p className="text-white text-right">Трансформация</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-1/3 h-4/5">
        <Image
          src="/images/contents/opening.png"
          alt=""
          fill
          className="relative object-contain object-right-bottom"
        />

        {/*
        <div className="absolute bottom-0 right-0 w-24 h-0 border-t-[16vh] border-b-0 border-r-[40vw] border-t-transparent border-b-transparent border-r-[var(--darkcyan)]"></div>
      */}
      </div>
    </div>
  );
}
