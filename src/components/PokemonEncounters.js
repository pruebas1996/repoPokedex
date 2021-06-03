import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import '../styles/pokemon.css';
import searchPokemon from '../services/searchPokemon';
const url = 'https://pokeapi.co/api/v2'
const PokemonEncounters = () => {
    let { id } = useParams();
    const [area, setArea] = useState([]);
    useEffect(() => {
        if (id) {
            searchPokemon(`${url}/pokemon/${id}/encounters`).then(res => {
                console.log(res.data)
                setArea(res.data)
            })
        }
    }, [id])
    const listArea = area.map(area => <div className='areaEncounters' key={area.location_area.name}>{area.location_area.name}</div>)
    return (
        <div className='container-area'>
            <h1>Location Area</h1>
            <Link to={`pokedex/pokemon/${id}`}>Back</Link>
            <div className='areaEncounters-cont'>
                {listArea}
            </div>
        </div>
    )
}

export default PokemonEncounters
