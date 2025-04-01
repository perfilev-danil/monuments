import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute w-full h-full top-0 p-8 flex flex-col justify-between">
      <nav className="w-full flex justify-between items-center">
        <div className="relative w-12 h-12 cursor-pointer ">
          <Image src="/images/icons/logo.png" alt="" className="" fill />
        </div>
        <div className="font-girlo text-white text-center">
          монументальное искусство <br />
          Енисейской Сибири
        </div>
        <button className="relative w-12 h-12 rounded-full border-white border-2 cursor-pointer">
          <Image src="/images/icons/search.png" alt="" className="p-2" fill />
        </button>
      </nav>
      <div className="text-3xl">text</div>
    </header>
  );
}
