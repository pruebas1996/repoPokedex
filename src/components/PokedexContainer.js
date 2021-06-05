import { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import readTypes from '../services/searchTypes';
import searchPokemon from '../services/searchPokemon';
import searchIdName from '../services/searchIdName';
import '../styles/pokemon.css';
import PokemonInfo from './PokemonInfo';
import ReactPaginate from 'react-paginate';
import PokemonDetails from './PokemonDetails';
import PokemonEncounters from './PokemonEncounters';

const array = [];
const PokedexContainer = () => {

    const [getType, setGetType] = useState([]);
    const [getTypesPokemon, setGetTypesPokemon] = useState('');
    const [UrlPokemon, setUrlPokemon] = useState([]);
    const [searchIdNameValue, setSearchIdNameValue] = useState('')
    const [load, setLoad] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // paginacion
    const [numberPage, setNumberPage] = useState(0)
    const pokemonForPage = 4;

    let pagesVisit = numberPage * pokemonForPage
    // newArray para cortar el arreglo y mapear por la cantidad cortada


    // uesEffect para llenar los tipos de pokemon en el select
    useEffect(() => {
        readTypes().then(res => {
            setGetType(res.data.results);
        });
    }, [])
    // useEffect para obtener los tipo de pokemon
    useEffect(() => {

        if (getTypesPokemon) {
            searchPokemon(getTypesPokemon).then(res => {
                setUrlPokemon(res.data.pokemon);
                setLoad(true);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [getTypesPokemon])
    // evento del select buscar para buscar por type de pokemon
    const handleChange = (event) => {
        setGetTypesPokemon(event.target.value);
        setNumberPage(0);

        setSearchIdNameValue('');
        setInputValue('');
    }

    // useEffect para obtener los pokemon por id o nombre
    useEffect(() => {

        if (searchIdNameValue) {
            array[0] = {
                pokemon: { url: searchIdName(searchIdNameValue) }
            };
            setUrlPokemon(array);
            setLoad(true);
        }
    }, [searchIdNameValue])

    // evento del boton buscar para buscar por Id o Nombre del pokemon
    const handleIdNameOnClikc = (value) => {
        setSearchIdNameValue(value);
        setGetTypesPokemon('');
        setNumberPage(0);
        setLoad(false);
    }

    const pageCount = Math.ceil(UrlPokemon.length / pokemonForPage)
    const pageChange = ({ selected }) => {
        setNumberPage(selected);
    }

    const newArray = () => {
        const sliceArray = UrlPokemon
            .slice(pagesVisit, pagesVisit + pokemonForPage)
            .map(
                poke => <PokemonInfo key={poke.pokemon.url} url={poke.pokemon.url}
                />);
        return sliceArray
    }
    let match = useRouteMatch();
    return (
        <div  >
            <Switch>
                <Route path={`${match.path}/pokemon/:id/encounters`} component={ <PokemonEncounters />} />
                <Route path={`${match.path}/pokemon/:id`}>
                    <div className='container-general'>
                        <PokemonDetails />
                    </div>
                </Route>
                <Route path={match.path}>
                    <h1>Pokedex</h1>
                    <div>
                        <select name='types' onChange={handleChange} value={getTypesPokemon} >
                            <option value=''>Select Type</option>
                            {getType.map(type => <option key={type.name} value={type.url}>{type.name}
                            </option>)}
                        </select>
                    </div>
                    <div>
                        <input type='text' placeholder='id or name' value={inputValue} onChange={(e) => setInputValue(e.target.value)} ></input>
                        <button onClick={() => { handleIdNameOnClikc(inputValue) }} >Search</button>
                    </div>
                    {load ?
                        <>
                            <div className='content'>
                                {newArray()}
                            </div>
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'next'}
                                pageCount={pageCount}
                                onPageChange={pageChange}
                                pageRangeDisplayed={9}
                                marginPagesDisplayed={0}
                                containerClassName={'paginationBttns'}
                                previousLinkClassName={'previousBttn'}
                                nextLinkClassName={'nextBttn'}
                                disabledClassName={'paginationDisabled'}
                                activeClassName={'paginationActive'}
                            />
                        </> : <h1>Seleccione un Tipo de pokemon</h1>}
                </Route>
            </Switch>
        </div>
    )
}

export default PokedexContainer

