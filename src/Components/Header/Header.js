import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { logout } from '../../services/users';
import './Header.css';

export default function Header() {
  const { currentUser, setCurrentUser } = useUserContext();
  const handleLogOut = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <div className="header">
      <h1>TypeTune</h1>
      <ul className="nav">
        <li>
          <NavLink className="homebutton" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="profile" exact to="/profile">
            Profile
          </NavLink>
        </li>
        {currentUser ? (
          <li onClick={handleLogOut}>
            <NavLink exact to="/">
              Log Out
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink exact to="/auth">
              Sign In / Sign Up
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
