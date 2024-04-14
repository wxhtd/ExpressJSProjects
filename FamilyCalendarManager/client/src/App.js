import React, {useState} from 'react';
import Calendar from './components/Calendar.js';
import EventForm from './components/EventForm.js';
import ProfileForm from './components/ProfileForm.js';
import Auth from './components/Auth.js';
import {UserContextProvider} from './context/UserContext.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = (isUserAuthenticated) => {
    // You would replace this with actual authentication logic
    setIsAuthenticated(isUserAuthenticated);
  };

  return (
    // <div className="App">
    //   <header>
    //     <h1>Family Calendar Manager</h1>
    //     {!isAuthenticated && (
    //       <button onClick={() => handleAuth(true)}>Sign In | Sign Up</button>
    //     )}
    //   </header>

    //   {/* 
    //     If the user is authenticated, show the ProfileForm or other parts of your app. 
    //     You can replace ProfileForm with the relevant component that should be shown after authentication.
    //   */}
    //   {isAuthenticated && <ProfileForm />}

    //   {/* Add other components that should be rendered based on the authenticated state */}
    // </div>
    
    // <UserContextProvider>
      <div className="App">
        {/* <ProfileForm /> */}
        <Calendar />
        {/* <EventForm /> */}
      </div>
    // </UserContextProvider>
  );
}

export default App;
