import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "./Store/Slices/Pokemon/thunks.jsx";

export const PokemonApp = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    return (
        <div>pokemonApp</div>
    )
}