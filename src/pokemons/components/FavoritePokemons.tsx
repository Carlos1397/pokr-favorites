'use client'

import PokemonGrid from "@/src/pokemons/components/PokemonGrid";
import { useAppSelector } from "@/src/store";
import { Fragment, useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
export const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector(state =>

    state.pokemons);
  const pokemonArray = Object.values(favoritePokemons.favorites);


  

  

  //console.log({favoritePokemons})
  return (


    <Fragment>
      {
        pokemonArray.length === 0
          ? (<NoFavorites />)
          : (<PokemonGrid pokemons={pokemonArray} />)
      }
    </Fragment>
  )
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50v] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay Favoritos</span>
    </div>
  )
}
