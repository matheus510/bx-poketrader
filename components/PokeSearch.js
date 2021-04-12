import { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import * as Pokedex from 'pokeapi-js-wrapper';
import { PokemonList } from '../config/PokemonList';
import { TraderContext } from './context';

export default function PokeSearch({ side }) {
    const { updateList } = useContext(TraderContext);

    const selectPokemon = (side, value) => {
        
        const P = new Pokedex.Pokedex();
        Promise.all(value.map((pokemon) => {
            const pokeInfo = P.getPokemonByName(pokemon.name);
            return pokeInfo
        })).then(result => {
            let parsedResult = result.map((pokemon) => {
                return {
                  name: pokemon.name,
                  base_experience: pokemon.base_experience,
                  id: pokemon.id
                }
              })
            updateList(side, parsedResult);
        })
    }


    return (
        <div>
            <Autocomplete
                multiple
                id={`side-${side}`}
                options={PokemonList}
                getOptionLabel={(option) => option.name}
                onChange={(event, value, reason) => selectPokemon(side, value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label={`Pick pokemons for Side ${String(side).toUpperCase()}`}
                    placeholder=""
                />
                )}
            />
        </div>
    )
}

