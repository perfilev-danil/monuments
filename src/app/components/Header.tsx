import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex z-20">
      <nav className="w-full flex justify-between items-center">
        <Link
          href={"/"}
          className="relative hidden lg:block w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid black" }}
        >
          <Image src="/images/icons/logo-b.png" alt="" className="p-2" fill />
        </Link>
        <Link href={"/"} className="mx-auto">
          <h1 className=" font-american text-[20px] leading-5 text-center">
            монументальное искусство <br />
            Енисейской Сибири
          </h1>
        </Link>
        <Link
          href={"/collection"}
          className="relative hidden lg:block w-10 h-10 rounded-full cursor-pointer shrink-0 hover:scale-110 transition-transform duration-300"
          style={{ border: "1px solid black" }}
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
