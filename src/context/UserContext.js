import { createContext, useState, useContext } from 'react';
import { getUser } from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUser());
  const [title, setTitle] = useState('');
  const [typedString, setTypedString] = useState('');

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser,
      title,
      setTitle,
      typedString,
      setTypedString
    }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be within a user provider');
  }
  return context;
};

export { UserProvider, useUserContext };