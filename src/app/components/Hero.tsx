import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        poster="images/contents/hero.jpg"
        className="w-full h-full object-cover"
      >
        <source src="videos/hero.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute bottom-0 w-full h-full p-8 z-10
        text-center text-white
        flex flex-col items-center justify-between"
      >
        {/* <div className="w-32 h-[1px] bg-white "></div> */}
        <p className="font-gogol text-center text-sm">ensib-monuments</p>
        <div className="w-full flex items-end justify-between">
          <div className="relative w-10 h-10 cursor-pointer">
            <Image src="/images/icons/logo-w.png" alt="" className="" fill />
          </div>
          <h1 className="font-gogol text-center text-sm">
            монументальное искусство <br />
            Енисейской Сибири
          </h1>
          <button className="relative w-10 h-10 rounded-full border-white border-1 cursor-pointer">
            <Image src="/images/icons/tg.png" alt="" className="p-2" fill />
          </button>
        </div>
      </div>
      <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent text-center flex items-end justify-center"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent text-center flex items-end justify-center"></div>
    </div>
  );
}
