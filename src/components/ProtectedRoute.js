import { Redirect, Route } from "react-router";
import { useAuth } from "../provider/AuthProvider"

const ProtectedRoute = ({ children, ...props }) => {
    const auth = useAuth();

    return <Route
        {...props}
        render={({ location }) =>
            auth.coachPokemon ?
                (children)
                :
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: location },
                    }}
                />
        }
    />

}

export default ProtectedRoute
