import { useEffect, useState } from 'react';
import { useParams, useRouteMatch, Link } from "react-router-dom";
import searchPokemon from '../services/searchPokemon';
import '../styles/pokemon.css';
const PokemonDetails = () => {
    let match = useRouteMatch();
    let { id } = useParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [moves, setMoves] = useState([]);
    const [hability, setHability] = useState([]);
    const [weightPoke, setWeightPoke] = useState('');
    const [heightPoke, setHeightPoke] = useState('');

    useEffect(() => {
        if (id) {
            searchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
                console.log(res.data)
                setName(res.data.name);
                setType(res.data.types[0].type.name);
                setHp(res.data.stats[0].base_stat);
                setAttack(res.data.stats[1].base_stat);
                setDefense(res.data.stats[2].base_stat);
                setSpeed(res.data.stats[3].base_stat);
                setWeightPoke(res.data.weight);
                setHeightPoke(res.data.height);
                setImage(res.data.sprites.other['official-artwork'].front_default);
                setMoves(res.data.moves);
                setHability(res.data.abilities);
            })
        }
    }, [id])

    const listMove = moves.map(moves => <div key={moves.move.name} >{moves.move.name}</div>)

    const listHability = hability.map(abilities => <h4 key={abilities.ability.name}>{abilities.ability.name}</h4>)
    return (
        <div className='conten-pokemon-info'>
            <div className='btn'>
                <Link to='/pokedex'>Back</Link>
                <h1>Detalles del pokemon {name} </h1>
                <Link to={`${match.url}/encounters`}>encounters</Link>
            </div>
            <div className='card-img-info' >
                <div className='img-title'>
                    <img alt={name} src={image} />
                </div>
                <div className='datos'>
                    <h1>Pokemon # {id} </h1>
                    <h5> name: {name}</h5>
                    <h5> type: {type}</h5>
                    <h5> hp: {hp}</h5>
                    <h5> attack: {attack}</h5>
                    <h5> defense: {defense}</h5>
                    <h5> speed: {speed}</h5>
                    <h5> weight: {weightPoke}hg</h5>
                    <h5> height: {heightPoke}</h5>
                    <h3>habilidad:</h3>
                    {listHability}
                </div>
            </div>
            <h3 id='move'>move</h3>
            <div className='move'>
                {listMove}
            </div>
        </div>
    )
}

export default PokemonDetails;
