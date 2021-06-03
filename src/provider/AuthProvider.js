import { createContext, useContext, useState } from 'react';

const authContext = createContext();

const fakeAuthProvider = {
    login: (cb) => {
        setTimeout(cb, 500)

    },
    logout: (cb) => {
        setTimeout(cb, 500);

    }
}

const useProvideAuth = () => {
    const [coachPokemon, setCoachPokemon] = useState(null)
    const signIn = (value, cb) => {
        fakeAuthProvider.login(() => {
            setCoachPokemon(value)
            cb()
        })
    }
    const signOut = (cb) => {
        fakeAuthProvider.logout(() => {
            setCoachPokemon(null)
            cb()
        })
    }
    return {
        coachPokemon,
        signIn,
        signOut
    }
}

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
export const useAuth = () => useContext(authContext)