"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./block/Header";

const HomePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/anime")
      .then((response) => response.json())
      .then((data) => {
        setAnimeList(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Header />
      <main className="bg-black py-8 px-6">
        <h2 className="text-3xl font-bold mb-6">Popular Anime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {animeList.length === 0 ? (
            <p>Loading anime...</p>
          ) : (
            animeList.map((anime) => (
              <div
                key={anime.mal_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedAnime(anime)}
              >
                {anime.images?.jpg?.large_image_url && (
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    width={300}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                )}
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

        {selectedAnime && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">{selectedAnime.title}</h2>
              <iframe
                src={selectedAnime.trailer_url}
                width="100%"
                height="400"
                allowFullScreen
              />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedAnime(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
