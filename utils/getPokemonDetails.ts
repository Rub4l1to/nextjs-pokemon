//* Interfaces
import { Pokemon } from "@/interfaces/pokemon-details";

//* Api
import { pokeApi } from "@/api/index";

export const getPokemonDetails = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};
