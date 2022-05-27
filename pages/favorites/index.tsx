import { useEffect, useState } from "react";

//* Components
import { MainLayout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui";
import { FavoritePokemons } from "@/components/pokemon";

//* Utils
import { localFavorites } from "@/utils/index";

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState(
    localFavorites.pokemons
  );

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, []);

  return (
    <MainLayout title="Pokemons - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons {...{ pokemons: favoritePokemons }} />
      )}
    </MainLayout>
  );
};
export default Favorites;
