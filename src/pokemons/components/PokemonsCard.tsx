'use client'
import Link from 'next/link'
import React from 'react'
import { SimplePokemon } from '..'
import Image from 'next/image';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { toggleFavorite } from '@/src/store/pokemons/pokemons';

interface Props {
    pokemon: SimplePokemon;
}
export const PokemonsCard = ({ pokemon }: Props) => {
    const { id, name } = pokemon;    
    const isFavorite = useAppSelector(state =>!!state.pokemons.favorites[id])
    const dispatch = useAppDispatch();
    const onToggle = ()=> {
        dispatch(toggleFavorite(pokemon));
    }
  return (
    <div className="mx-auto right-0 w-60">
    <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="text-center p-6 bg-gray-800 border-b">
            <p className="pt-2 text-lg font-semibold text-gray-50m capitalize">{name}</p>
            <div className="flex justify-center items-center">
                <Image
                    key={pokemon.id}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    height={0}
                    width={0}
                    priority={false}
                    style={{ width: '100px', height: "100px" }}
                    alt={pokemon.name} />
            </div>
            <div className="mt-5">
                <Link
                    href={`/dashboard/pokemon/${name}`}
                    className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
                >
                    Leer Mas...
                </Link>
            </div>
        </div>
        <div className="border-b"> 
            <div 
            onClick={onToggle}
            className="px-4 py-2 hover:bg-gray-100 flex items-center  cursor-pointer hover:scale-105" >

                <div 
                 
                 className={`text-red-600 transition ease-in-out duration-800 hover:scale-125
                 ${
                    isFavorite ? 'scale-110 ' : 'scale-100 '
                  }`}
                  
                >
                    {
                        isFavorite 
                        ? ( <IoHeart/>)
                        : ( <IoHeartOutline />)
                    }
                   
                </div>
                <div className="pl-3">
                    <p className="text-sm font-medium text-gray-800 leading-none"
                    
                    
                    >
                        {
                         isFavorite 
                         ? 'Es Favorito'
                         : 'No es Favorito'
                        }
                    </p>
                    <p className="text-xs text-gray-500">Click Para cambiar</p>
                </div>
            </div>

        </div >
    </div >
</div >
  )
}



 

 