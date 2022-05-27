const toggleFavorite = (id: number) => {
  console.log("toggleFavorite");

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  favorites.includes(id)
    ? (favorites = favorites.filter((item) => item !== id))
    : favorites.push(id);

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existInFavorites = (id: number): Boolean => {
  if (typeof window === "undefined") return false;

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return favorites.includes(id);
};

const pokemons = (): number[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default { toggleFavorite, existInFavorites, pokemons };
