import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full ">
      <nav className="w-full flex justify-between items-center">
        <Link
          href={"/"}
          className="relative w-10 h-10 cursor-pointer hover:scale-110 transition-transform duration-300"
        >
          <Image src="/images/icons/logo-b.png" alt="" className="" fill />
        </Link>
        <h1 className="font-american text-[20px] leading-5 text-center">
          монументальное искусство <br />
          Енисейской Сибири
        </h1>
        <Link
          href={"/collection"}
          className="relative w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "2px solid black" }}
        >
          <Image
            src="/images/icons/collection-b.png"
            alt=""
            className="p-2"
            fill
          />
        </Link>
      </nav>
    </header>
  );
}
