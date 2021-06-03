import axios from "axios"

const baseUrl = 'https://pokeapi.co/api/v2'

const readTypes = () => {
  const promise = axios.get(`${baseUrl}/type`)

  return promise
}

export default readTypes