import { useEffect, useState } from 'react';
import searchPokemon from '../services/searchPokemon';
import PokemonItems from './PokemonItems';
const PokemonInfo = ({ url }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [id, setId] = useState(0);
    useEffect(() => {
        if (url) {
            searchPokemon(url).then(res => {
                setId(res.data.id)
                setName(res.data.name);
                setType(res.data.types[0].type.name);
                setHp(res.data.stats[0].base_stat);
                setAttack(res.data.stats[1].base_stat);
                setDefense(res.data.stats[2].base_stat);
                setSpeed(res.data.stats[3].base_stat);
                setImage(res.data.sprites.other['official-artwork'].front_default);
            })
        }
    }, [url])
    return (
        <div className='card'>
            <PokemonItems name={name} type={type} image={image} hp={hp} attack={attack} defense={defense} speed={speed} id={id} />
        </div>
    )
}
export default PokemonInfo
