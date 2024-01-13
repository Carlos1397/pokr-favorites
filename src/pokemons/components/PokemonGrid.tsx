import React from 'react'
import { SimplePokemon } from '../interfaces/simple-pokemon'
import {PokemonsCard} from './PokemonsCard';

interface Props{
    pokemons: SimplePokemon[];

}

const PokemonGrid = ({pokemons}:Props) => {
  return (
    <div className="flex flex-wrap gap-10 p-6 items-center justify-center">
    {
        pokemons.map(pokemon => (
           
            
            <PokemonsCard key={pokemon.id} pokemon={pokemon}/>

        ))

    }

</div>
  )
}

export default PokemonGrid