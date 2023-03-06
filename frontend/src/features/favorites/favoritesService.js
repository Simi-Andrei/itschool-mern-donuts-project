import axios from "axios";

// add item to favorites
const addItemToFavorites = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const favoritesService = { addItemToFavorites };

export default favoritesService;
