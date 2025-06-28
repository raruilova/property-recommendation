import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="my-5">
      <nav className="flex justify-center gap-40 border-gray-400 border-b-1 py-3">
        <Link href="/" className="text-black">
          PT
        </Link>
        <Link href="/favorites" className="hover:text-blue-400 text-black">
          Favoritos
        </Link>
      </nav>
    </header>
  );
};
