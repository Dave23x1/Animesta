import { searchAnime } from "@/lib/api/animeapi.js";
import Header from "../block/Header.jsx";

const SearchPage = ({ searchResults, query }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-8 px-6">
        <h2 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            searchResults.map((anime) => (
              <div
                key={anime.mal_id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
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

export async function getServerSideProps(context) {
  const { q } = context.query;
  let searchResults = [];

  if (q && q.trim() !== "") {
    try {
      searchResults = await searchAnime(q);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      searchResults,
      query: q || "",
    },
  };
}

export default SearchPage;
