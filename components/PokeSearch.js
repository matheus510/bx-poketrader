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
            console.log(result)
            updateList(side, result);
        })
    }


    return (
        <div>
            <Autocomplete
                multiple
                id={`side-${side}`}
                options={PokemonList}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                filterSelectedOptions
                onChange={(event, value, reason) => selectPokemon(side, value)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                />
                )}
            />
        </div>
    )
}

