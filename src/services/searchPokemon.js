import axios from "axios"

const searchPokemon = (url) => {
  const promise = axios.get(url)

  return promise
}

export default searchPokemon;