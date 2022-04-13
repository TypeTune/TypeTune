import React, { useEffect, useState } from 'react';
import { saveText } from '../services/usersaves';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import TextForm from '../Components/TextForm/TextForm';
import { useTextContext } from '../context/TextContext';
import './Home.css';

export default function Home() {
  const {
    title,
    typedString,
    setTitle,
    setTypedString,
    setId,
    savedTitle,
    setSavedTitle,
    savedTypedString,
    setSavedTypedString,
    instrument,
  } = useTextContext();
  const { currentUser } = useUserContext();
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // if (savedTitle || savedTypedString)
    setId('');
    setTitle(savedTitle);
    setTypedString(savedTypedString);
  }, [
    setTitle,
    setTypedString,
    setId,
    savedTitle,
    setSavedTitle,
    savedTypedString,
    setSavedTypedString,
  ]);

  //saves text to supabase
  const handleSave = async () => {
    if (title.length > 0 && typedString.length > 0) {
      try {
        await saveText(title, typedString, instrument);
        setTitle('');
        setTypedString('');
        setSavedTitle('');
        setSavedTypedString('');
        history.push('/profile');
      } catch (e) {
        setError(e.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    } else {
      setError(`You're missing something...`);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  //handler for redirecting when user is not signed in and trys to save
  const handleRedirect = () => {
    setSavedTitle(title);
    setSavedTypedString(typedString);
    history.push('/auth');
  };

  return (
    <div>
      {error && <p className="errorMessage">{error}</p>}
      <div className='formContainer'>
        <TextForm handleSave={handleSave} handleRedirect={handleRedirect}/>
      </div>
    </div>
  );
}
