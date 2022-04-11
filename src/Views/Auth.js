import React from 'react';
import { useState } from 'react';
import AuthForm from '../Components/AuthForm';
import { signInUser, signUpUser } from '../services/users';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('sign-in');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      authType === 'sign-in'
        ? await signInUser(email, password)
        : await signUpUser(email, password);
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
