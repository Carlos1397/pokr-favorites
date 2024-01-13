import { SimplePokemon } from "@/src/pokemons";
import PokemonGrid from "@/src/pokemons/components/PokemonGrid";
import { PokemonsResponse } from "@/src/pokemons/interfaces/pokemons-response";


export const metadata = {
    title: '151 Pokémones',
    description: 'listado de pókemones'
}

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    ).then(

        res => res.json()
    );

    const pokemons = data.results.map((pokemon, index) => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    }));

    //   throw new Error('Esto es un error que no debería suceder');
    return pokemons;
}


export default async function pokemonsPage() {

    const pokemons = await getPokemons(151);


    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2 text-black">Listado de Pokémones <small className="text-blue-600">estático</small></span>
            <PokemonGrid pokemons={pokemons} />
        </div>


    );
}