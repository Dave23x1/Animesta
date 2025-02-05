"use client";
import { useEffect, useState } from "react";
import { fetchPopularAnime } from "@/lib/api/animeapi.js";
import Header from "./block/Header.jsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

const HomePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [query, setQuery] = useState(""); // To store query parameter
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  console.log("search", search);

  useEffect(() => {
    const getPopularAnime = async () => {
      try {
        const data = await fetchPopularAnime(search);
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching popular anime:", error);
      }
    };

    getPopularAnime();
  }, [search]);

  return (
    <div>
      <Header />
      <main className="bg-black py-8 px-6">
        <h2 className="text-3xl font-bold mb-6">Popular Anime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {animeList.length === 0 ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin border-t-2 border-b-2 border-blue-500 rounded-full w-8 h-8"></div>
            </div>
          ) : (
            animeList.map((anime) => (
              <div
                key={anime.mal_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{anime.title}</h3>
                  <p className="text-sm text-gray-600">
                    {anime.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
