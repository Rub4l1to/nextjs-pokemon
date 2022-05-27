export interface PokemonListResponse {
  count?: number;
  next?: string;
  previous?: null;
  results: SmallPokemon[];
}

export interface SmallPokemon {
  name: string;
  url: string;
  id?: string;
  img: string;
}
