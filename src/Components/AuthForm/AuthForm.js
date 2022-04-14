import './AuthForm.css';
import React from 'react';

export default function AuthForm({ handleSubmit, setEmail, setPassword, authType, setAuthType }) {
  const handleClick = (clicked) => {
    authType !== clicked && setAuthType(clicked);
  };

  return (
    <div>
      <div className="signinsignup">
        <span
          className={authType === 'sign-in' && 'selected'}
          onClick={() => handleClick('sign-in')}
        >
          Sign In
        </span>
        <span
          className={authType === 'sign-up' && 'selected'}
          onClick={() => handleClick('sign-up')}
        >
          Sign Up
        </span>
      </div>
      <form className="authform" onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
        </label>
        <label>Password:
          <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        <button className='submitButton'>Submit</button>
      </form>
    </div>
  );
}
