
import { Pokemon, PokemonsResponse } from "@/src/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { name: string }
}
//build
export async function generateStaticParams() {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=150`
  ).then(

    res => res.json()
  );

  const staticPokemons = data.results.map((pokemon, index) => ({
    name: pokemon.name,
  }));
  //static html 151 pókemones       

  return staticPokemons.map(({ name }) => ({
    name: name
  }));
}



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id, name } = await getPokemon(params.name);
    return (
      {
        title: `#${id} - ${name}`,
        description: `Página del pokemón ${name}`
      }
    )
  } catch (error) {
    return ({
      title: `Página del pokémon`,
      description: `No disponible`
    })
  }

}

const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      //  cache: 'force-cache'  //TODO: CAMBIAR ESTO EN FUTUTRO
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then(resp => resp.json());



    return pokemon;
  } catch (error) {
    notFound();
  }


}
export default async function PokemonPage({ params }: Props) {

  const pokemon = await getPokemon(params.name);

  console.log(pokemon.name);
  return (
    <div className="flex flex-col mt-4 mb-4 items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-4 mb-4 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              height={0}
              width={0}
              style={{ width: '150px', height: "150px" }}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full ">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                height={100}
                width={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                height={100}
                width={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                height={100}
                width={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                height={100}
                width={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}