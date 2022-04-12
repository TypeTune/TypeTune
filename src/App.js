import { Redirect, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import { useUserContext } from './context/UserContext';
import Auth from './Views/Auth';
import Home from './Views/Home';
import Profile from './Views/Profile';
import Edit from './Views/Edit';

function App() {
  const { currentUser } = useUserContext();

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url('background.png')`,
        height: `100vh`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/auth">{!currentUser ? <Auth /> : <Redirect exact to="/" />}</Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">{currentUser ? <Profile /> : <Redirect to="/auth" />}</Route>
          <Route path="/edit/:id">{currentUser ? <Edit /> : <Redirect exact to="/auth" />}</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
