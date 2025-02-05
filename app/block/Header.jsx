import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [query, setQuery] = useState(search || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/?search=${query}`);
  };

  useEffect(() => {
    setQuery(search || "");
  }, [search]);

  return (
    <header className="bg-black text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src="/images/LOGO ANIMESTA.png"
            width={150}
            height={80}
            alt="LOGO"
          />
        </Link>
      </div>

      <form
        className="flex items-center border-2 border-gray-300 rounded-full px-4 py-2 max-w-lg w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime..."
          className="w-full outline-none text-lg bg-transparent"
        />
        <button
          type="submit"
          className="ml-2 bg-orange-600 text-white rounded-full px-4 py-2 hover:bg-orange-800 transition"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
