import React from 'react';

export default function AuthForm({ handleSubmit, setEmail, setPassword, authType, setAuthType }) {
  const handleClick = (clicked) => {
    authType !== clicked && setAuthType(clicked);
  };

  return (
    <div>
      <span className={authType === 'sign-in' && 'selected'} onClick={() => handleClick('sign-in')}>
        Sign In
      </span>
      <span className={authType === 'sign-up' && 'selected'} onClick={() => handleClick('sign-up')}>
        Sign Up
      </span>
      <form></form>
    </div>
  );
}
