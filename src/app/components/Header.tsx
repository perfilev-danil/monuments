import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full">
      <nav className="w-full flex justify-between items-center">
        <div className="relative w-10 h-10 cursor-pointer">
          <Image src="/images/icons/logo.png" alt="" className="" fill />
        </div>
        <h1 className="font-gogol text-center text-sm">
          монументальное искусство <br />
          Енисейской Сибири
        </h1>
        <button className="relative w-10 h-10 rounded-full border-black border-1 cursor-pointer shrink-0">
          <Image src="/images/icons/search.png" alt="" className="p-2" fill />
        </button>
      </nav>
    </header>
  );
}
