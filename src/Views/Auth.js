import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../Components/AuthForm/AuthForm';
import { useUserContext } from '../context/UserContext';
import { signInUser, signUpUser } from '../services/users';

export default function Auth() {
  const { setCurrentUser } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('sign-in');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      authType === 'sign-in'
        ? await signInUser(email, password)
        : await signUpUser(email, password);
      setCurrentUser(email);
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <AuthForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        authType={authType}
        setAuthType={setAuthType}
      />
    </div>
  );
}
