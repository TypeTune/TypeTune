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
import backgroundImage from './Images/background.png';
import AboutUs from './Views/AboutUs';
import Footer from './Components/Footer/Footer';

function App() {
  const { currentUser } = useUserContext();

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: `100vh`,
        width: `100vw`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: 'cover',
      }}
    >
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/auth">{!currentUser ? <Auth /> : <Redirect exact to="/" />}</Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">{currentUser ? <Profile /> : <Redirect to="/auth" />}</Route>
          <Route path="/edit/:id">{currentUser ? <Edit /> : <Redirect exact to="/auth" />}</Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
