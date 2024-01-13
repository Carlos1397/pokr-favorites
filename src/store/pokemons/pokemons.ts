import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SimplePokemon } from '@/src/pokemons';
/*
 {
    "1":{ id:1, name:'bulbasaur'},
    "2":{ id:2, name:'bulbasaur'},
    "3":{ id:3, name:'bulbasaur'}
 }
*/
interface PokemonsState{
    favorites: {[key: string] : SimplePokemon},
}
// const getInitialState = (): PokemonsState => {
//     const favorites = JSON.parse(  localStorage.getItem('favorite-pokemons') ?? '{}' );
   
//     return  favorites;
// };

const initialState:PokemonsState = {
    favorites:{}
    /*
 {
    "1":{ id:1, name:'bulbasaur'},
    "2":{ id:2, name:'bulbasaur'},
    "3":{ id:3, name:'bulbasaur'}
 }
*/
}

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setFavoritePokemons(state,action:PayloadAction<{[key:string]:SimplePokemon}>){
            state.favorites=action.payload;

        },
        toggleFavorite(state, action:PayloadAction<SimplePokemon>){
            const pokemon = action.payload;

            const {id} = pokemon;

            if(!!state.favorites[id]){
                delete state.favorites[id];
                //return;
             }
            else{
                state.favorites[id]=pokemon
            }  
            //TODO: NO SE DEBE HACER
          localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites));
        }
    }
});

export const { toggleFavorite, setFavoritePokemons} = pokemonsSlice.actions

export default pokemonsSlice.reducer
 