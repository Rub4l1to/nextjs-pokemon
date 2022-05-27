import { AxiosResponse } from "axios";
import type { NextPage, GetStaticProps } from "next";

//* Axios
import { pokeApi } from "@/api/index";

//* Interfaces
import { PokemonListResponse, SmallPokemon } from "@/interfaces/index";

import { Grid } from "@nextui-org/react";

//* Components
import { MainLayout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemon";

interface HomeProps {
  pokemons: SmallPokemon[];
}

const Home: NextPage<HomeProps> = ({ pokemons }) => {
  return (
    <MainLayout title="Pokemons">
      <Grid.Container gap={2}>
        {pokemons?.map((pokemon) => (
          <PokemonCard {...{ pokemon }} key={pokemon.id} />
        ))}
      </Grid.Container>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data }: AxiosResponse = await pokeApi.get<PokemonListResponse>(
    "/pokemon?limit=151"
  );

  const pokemons: SmallPokemon[] = data.results.map(
    (pokemon: SmallPokemon, index: number) => ({
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
    })
  );

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
