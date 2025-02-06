import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAnimeDetails } from "@/lib/api/animeapi.js";

const AnimeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (id) {
      const getAnimeDetails = async () => {
        try {
          const data = await fetchAnimeDetails(id);
          setAnime(data);
        } catch (error) {
          console.error("Error fetching anime details:", error);
        }
      };
      getAnimeDetails();
    }
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  return (
    <div>
      <h1>{anime.title}</h1>
      <iframe
        src={anime.trailer_url}
        width="100%"
        height="400"
        allowFullScreen
      />
    </div>
  );
};

export default AnimeDetailPage;
