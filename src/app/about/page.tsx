import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <div className="">
      <div className="w-full h-full md:h-[900px] lg:h-screen lg:gap-8 p-4 lg:p-8">
        <Header />
        <div className="flex flex-col gap-8 pt-8">
          <div className="flex flex-col gap-2">
            <span className="text-[26px]">О проекте</span>
            <p className="text-justify">
              «Енисейская Сибирь», объединяющая Красноярский край, Республику
              Хакасия и Республику Тыва, представляет собой не только
              географический, но и культурно–исторический макрорегион, где
              монументальное искусство — скульптуры, памятники и мемориалы —
              выступает материальным носителем исторической памяти. Несмотря на
              доступность информации, существующие данные разрознены и
              малопригодны для гуманитарных исследований. Проект нацелен на
              создание цифровой инфраструктуры для систематизации этих сведений.
              Инициатива направлена на сохранение культурного наследия
              макрорегиона и активизацию научной деятельности.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[26px]">Разработчики</span>
            <div className="flex gap-20 lg:gap-0 items-start justify-between">
              <p>Идея</p>
              <p className="text-right">Сенотрусова Полина Олеговна</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Академическое сопровождение</p>
              <p className="text-right">Нигматуллин Илья Рафаильевич</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Реализация проекта</p>
              <p className="text-right">Перфильев Данил Владимирович</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[26px]">Поддержка</span>
            <div className="flex justify-between">
              <p>Напишите нам</p>
              <Link href="mailto:dhlab@sfu-kras.ru" className="text-right">
                dhlab@sfu-kras.ru
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
