import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { logout } from '../../services/users';

export default function Header() {
  const { currentUser, setCurrentUser } = useUserContext();
  const handleLogOut = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <div>
      TypeTune
      <ul>
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
          <li onClick={handleLogOut}>Log Out</li>
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
