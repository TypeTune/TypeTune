import { useState } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { getUser } from './services/users';
import Auth from './Views/Auth';
import Home from './Views/Home';

function App() {
  const [currentUser, setCurrentUser] = useState(getUser());

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path="/auth">
            <Auth setCurrentUser={setCurrentUser} />
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
