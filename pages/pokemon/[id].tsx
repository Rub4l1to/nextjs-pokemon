import { useState } from "react";

//* Next
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { Button, Card, Container, Grid, Text } from "@nextui-org/react";

//* Confetti
import confetti from "canvas-confetti";

//* Api
import { pokeApi } from "@/api/index";

//* Components
import { MainLayout } from "@/components/layouts";

//* Interfaces
import { Pokemon } from "@/interfaces/pokemon-details";

//* Utils
import { getPokemonDetails, localFavorites } from "@/utils/index";

interface PokemonPageProps {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<PokemonPageProps> = ({
  pokemon: { id, name, sprites },
}) => {
  const [isInFavorites, setInFavorites] = useState(
    localFavorites.existInFavorites(id)
  );

  const onToggleFavorites = () => {
    localFavorites.toggleFavorite(id);
    setInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  return (
    <MainLayout title={`${name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  sprites.other?.dream_world.front_default || "/no-image.png"
                }
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorites}
              >
                {isInFavorites ? "Remove from favorites" : "Add to favorites"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container display="flex" gap={0}>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((_, index) => index + 1);

  return {
    paths: pokemons151.map((id) => ({ params: { id: id.toString() } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonDetails(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 1 day
  };
};

export default PokemonPage;
