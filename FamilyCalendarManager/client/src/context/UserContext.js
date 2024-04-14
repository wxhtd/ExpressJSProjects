import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// Create a custom hook to use the UserContext, for convenience
export const useUserContext = () => useContext(UserContext);

// Define a Provider component that wraps your app and makes an UserContext object available to any child component that calls useUserContext().
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Placeholder for actual user authentication logic

  const signIn = (userData) => {
    // Placeholder for sign in logic
    setUser(userData);
  };

  const signOut = () => {
    // Placeholder for sign out logic
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signOut
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
