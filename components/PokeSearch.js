import { useContext } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import * as Pokedex from 'pokeapi-js-wrapper';
import { PokemonList } from '../config/PokemonList';
import { TraderContext } from './context';

export default function PokeSearch({ side }) {
    const { updateList, sides } = useContext(TraderContext);

    const selectPokemon = (side, value) => {
        
        const P = new Pokedex.Pokedex();
        Promise.all(value.map((pokemon) => {
            const pokeInfo = P.getPokemonByName(pokemon.name);
            return pokeInfo
        })).then(result => {
            updateList(side, result);
            console.log("sides pós update", sides)
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
                    label={`Side ${side}`}
                    placeholder="Eg: Dragonite, Pikachu..."
                />
                )}
            />
        </div>
    )
}

