import Image from "next/image";

export default function Footer() {
  return (
    <div className="w-full h-96 bg-[var(--darkcyan)] text-white flex p-8 text-sm">
      <div className="w-1/3 flex flex-col justify-between">
        <p>sib-monuments</p>
        <div className="w-[1px] h-10 bg-white "></div>
        <p>
          По вопросам и предложениям <br /> обращайтесь в Telegram
        </p>
      </div>
      <div className="w-1/3 flex flex-col justify-between items-center">
        <p className="font-gogol text-center text-sm">ensib-monuments</p>
        <div className="relative w-10 h-10 cursor-pointer">
          <Image src="/images/icons/logo-w.png" alt="" className="" fill />
        </div>
        <p className="text-center font-gogol text-sm">
          монументальное искусство <br /> Енисейской Сибири
        </p>
      </div>
      <div className="w-1/3 flex flex-col justify-between items-end">
        <button className="relative w-10 h-10 rounded-full border-white border-1 cursor-pointer shrink-0">
          <Image
            src="/images/icons/arrow.png"
            alt=""
            className="p-2 rotate-90"
            fill
          />
        </button>
        <div className="w-[1px] h-10 bg-white "></div>
        <button className="relative w-10 h-10 rounded-full border-white border-1 cursor-pointer shrink-0">
          <Image src="/images/icons/tg.png" alt="" className="p-2" fill />
        </button>
      </div>
    </div>
  );
}
