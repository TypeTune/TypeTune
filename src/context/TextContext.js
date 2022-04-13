import { createContext, useState, useContext, useEffect } from 'react';
import { fetchTextsById } from '../services/usersaves';

const TextContext = createContext();

const TextProvider = ({ children }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [typedString, setTypedString] = useState('');
  const [error, setError] = useState('');
  const [savedTitle, setSavedTitle] = useState('');
  const [savedTypedString, setSavedTypedString] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchTextsById(id);
        setTitle(data.title);
        setTypedString(data.text_content);
      };
      if (id) fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, [id]);

  return (
    <TextContext.Provider
      value={{
        title,
        setTitle,
        typedString,
        setTypedString,
        error,
        setError,
        id,
        setId,
        savedTitle,
        setSavedTitle,
        savedTypedString,
        setSavedTypedString,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

const useTextContext = () => {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error('useTextContext must be within a user provider');
  }
  return context;
};

export { TextProvider, useTextContext };
