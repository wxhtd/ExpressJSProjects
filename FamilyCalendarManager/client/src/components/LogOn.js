import React, { useState } from 'react';
import './LogOn.css';
import axios from 'axios';
import ProfileForm from './ProfileForm';

const LogOn = () => {
  // States for Sign In and Sign Up forms
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState('');

  const userServiceUrl = "https://localhost:8000/api/users";
  // Event handlers for form submissions
  const handleSignIn = async (event) => {
    event.preventDefault();
    // Handle Sign In
    try {
      console.log('handle sign in');
      const response = await axios.post(`${userServiceUrl}/login`,
        {
          username: signInUsername,
          password: signInPassword
        });
      const result = response.data;
      console.log(`result=${JSON.stringify(result)}`);
      if (result.userId !== null) {
        setUserId(result.userId);
        setName(result.name);
        setEmail(result.Email);
        setPeople(result.people);
        setIsAuthenticated(true);        
        setSignInError('');
      }
      else {
        setSignInError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    // Handle Sign Up
    try {
      console.log('handle sign in');
      const response = await axios.post(`${userServiceUrl}/signup`,
        {
          username: signInUsername,
          password: signInPassword,
          name: signUpName,
          Email: signUpEmail
        });
      const result = response.data;
      console.log(`result=${JSON.stringify(result)}`);
      if (result.userId !== null) {
        setUserId(result.userId);
        setName(result.name);
        setEmail(result.Email);
        setPeople(result.people);
        setIsAuthenticated(true);
        setSignUpError('');
      }
      else {
        setSignUpError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      {!isAuthenticated && (
        <>
          <div className="form sign-in-form">
            <h2>Sign In</h2>
            <input type="text" placeholder="Username" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
            {signInError && <div className="error-message">{signInError}</div>}
            <button type="submit" onClick={handleSignIn}>Sign in</button>
            <a href="#" className="form-link">Forgot password?</a>
          </div>

          <hr className="form-separator" />
          <div className="form sign-up-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
            <input type="text" placeholder="Name" value={signUpName} onChange={(e) => setSignUpName(e.target.value)} />
            <input type="text" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
            {signUpError && <div className="error-message">{signUpError}</div>}
            <button type="submit" onClick={handleSignUp}>Sign up</button>
          </div>
        </>)}
      {isAuthenticated && <ProfileForm 
      userId={userId}
      propName={name}
      propEmail={email}
      propPeople={people}
      />}
    </div>
  );
};

export default LogOn;
