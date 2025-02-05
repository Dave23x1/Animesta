import axios from "axios";

const API_URL = "https://api.jikan.moe/v4";

export const fetchPopularAnime = async (search) => {
  try {
    const response = await axios.get(`${API_URL}/anime`, {
      params: {
        order_by: "popularity",
        sort: "desc",
        page: 1,
        q: search,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching popular anime:", error);
    return [];
  }
};

export const searchAnime = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/anime`, {
      params: {
        q: query,
        page: 1,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    return [];
  }
};
