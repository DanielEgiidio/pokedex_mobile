import React from "react";

import dotsImage from "../../assets/img/dots.png";
import pokeball from "../../assets/img/pokeballCard.png";

import { FadeAnimation } from "../FadeAnimation";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

export type PokemonType = {
  type: {
    name: string;
  };
};

export type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

type Props = {
  data: Pokemon;
} & TouchableOpacityProps;

export function Card({ data, ...rest }: Props) {
  return (
    <S.PokemonCard type={data.types[0].type.name} {...rest}>
      <S.LeftSide>
        <S.PokemonId>#{data.id}</S.PokemonId>
        <S.PokemonName>{data.name}</S.PokemonName>
        <S.ImageCardFrame source={dotsImage} />

        <S.ContainerPokemonType>
          {data.types.map((pokemonType) => (
            <S.PokemonType
              type={pokemonType.type.name}
              key={pokemonType.type.name}
            >
              <S.PokemonTypeText key={pokemonType.type.name}>
                {pokemonType.type.name}
              </S.PokemonTypeText>
            </S.PokemonType>
          ))}
        </S.ContainerPokemonType>
      </S.LeftSide>

      <S.RightSide>
        <S.PokeballDetail source={pokeball} />
        <FadeAnimation>
          <S.PokemonImage
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            }}
          />
        </FadeAnimation>
      </S.RightSide>
    </S.PokemonCard>
  );
}
