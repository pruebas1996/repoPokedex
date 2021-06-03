const baseUrl = 'https://pokeapi.co/api/v2'

const searchIdName = (value) => {
    return `${baseUrl}/pokemon/${value}`
}

export default searchIdName;