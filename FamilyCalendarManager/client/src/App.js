import React, {useState} from 'react';
import LogOn from './components/LogOn.js';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = (isUserAuthenticated) => {
    // You would replace this with actual authentication logic
    setIsAuthenticated(isUserAuthenticated);
  };

  return (
    <div className="App">
      <header>
        <h1>Family Calendar Manager</h1>
        {!isAuthenticated && (
          <button onClick={() => handleAuth(true)}>Sign In | Sign Up</button>
        )}
      </header>
      {isAuthenticated && <LogOn />}
    </div>
  );
}

export default App;
