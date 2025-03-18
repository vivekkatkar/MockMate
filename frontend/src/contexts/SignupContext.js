import React, { createContext, useContext, useState } from 'react';

// Create the context
const SignupContext = createContext();

// Create a provider component
export const SignupProvider = ({ children }) => {
    const [isSignedUp, setIsSignedUp] = useState(false);

    const toggleSignUp = () => {
        setIsSignedUp(prevState => !prevState);
    };

    return (
        <SignupContext.Provider value={{ isSignedUp, toggleSignUp }}>
            {children}
        </SignupContext.Provider>
    );
};

// Custom hook for using the context
export const useSignup = () => {
    return useContext(SignupContext);
};
