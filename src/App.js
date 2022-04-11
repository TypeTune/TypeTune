import { useState } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import { useUserContext } from './context/UserContext';
import { getUser } from './services/users';
import Auth from './Views/Auth';
import Home from './Views/Home';

function App() {
  // const { currentUser, setCurrentUser } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
