import { FavoritePokemons } from "@/src/pokemons/components/FavoritePokemons";


export const metadata = {
    title: 'Favoritos',
    description: 'listado de pókemones'
}

export default async function PokemonsFavoritesPage() {
    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2 text-black">Pókemons Favorites <small className="text-blue-600">Global State</small></span>
            
            <FavoritePokemons/> 
        </div>
    );
}

 