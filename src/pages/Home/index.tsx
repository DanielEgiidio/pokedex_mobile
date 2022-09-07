import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text } from "react-native";
import { Card, Pokemon, PokemonType } from "../../components/Card";
import { FadeAnimation } from "../../components/FadeAnimation";
import api from "../../services/api";

import * as S from "./styles";

// type PokemonType = {
//   type: {
//     name: string;
//   };
// };

// export interface Pokemon {
//   name: string;
//   url: string;
//   id: number;
//   types: PokemonType[];
// }

export interface Request {
  id: number;
  types: PokemonType[];
}

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function getPokemons() {
      const response = await api.get("/pokemon");
      const { results } = response.data;

      const payloadPokemons = await Promise.all(
        results.map(async (pokemon: Pokemon) => {
          const { id, types } = await getMoreInfo(pokemon.url);

          return {
            name: pokemon.name,
            id,
            types,
          };
        })
      );
      setPokemons(payloadPokemons as Pokemon[]);
    }
    getPokemons();
  }, []);

  async function getMoreInfo(url: string) {
    const response = await api.get(url);
    const { id, types } = response.data;

    return { id, types };
  }

  return (
    <S.Container>
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.id.toString()}
        renderItem={({ item: pokemon }) => (
          <FadeAnimation>
            <Card data={pokemon} />
          </FadeAnimation>
        )}
      />
    </S.Container>
  );
}
