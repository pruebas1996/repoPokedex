import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import PokedexContainer from './components/PokedexContainer';
function App() {


  return (
    <div className="App">
      <header className="App-header">
        <Router>

          <Switch>
            <ProtectedRoute path="/pokedex">
              <PokedexContainer />
            </ProtectedRoute>
            <Route path="/login" component={Login} />
            <Route path='/'>
              <Redirect to='/login' />
            </Route>
          </Switch>

        </Router>
      </header>
    </div>
  );
}

export default App;
