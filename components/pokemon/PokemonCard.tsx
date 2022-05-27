import { FC } from "react";
import { useRouter } from "next/router";

//* Next Ui
import { Card, Grid, Row, Text } from "@nextui-org/react";

//* Interfaces
import { SmallPokemon } from "interfaces";

interface PokemonCardProps {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<PokemonCardProps> = ({
  pokemon: { id, img, name },
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card hoverable clickable onClick={handleClick}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            objectFit="contain"
            src={img}
            width="100%"
            height={140}
            alt={name}
          />
        </Card.Body>
        <Card.Footer>
          <Row wrap="wrap" justify="space-between">
            <Text b>{name}</Text>
            <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
              {id}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
