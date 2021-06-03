import { Link, useRouteMatch } from "react-router-dom";
const PokemonItems = ({ name, image, type, hp, attack, defense, speed, id }) => {
    let match = useRouteMatch();
    return (
        <>
            <div className='card-img' >
                <img alt={name} src={image} />
            </div>
            <div className='card-text' >
                <Link to={`${match.url}/pokemon/${id}`}>{name}</Link>
                <h5> type: {type}</h5>
                <h5> hp: {hp}</h5>
                <h5> attack: {attack}</h5>
                <h5> defense: {defense}</h5>
                <h5> speed: {speed}</h5>
            </div>
        </>
    )
}

export default PokemonItems;
