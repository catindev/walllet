import React, { useState, useContext } from 'react';

const SignContext = React.createContext();

export const SignProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [step, setStep] = useState(1); 
    const [regToken, setRegToken] = useState("");
    const resetSign = () => {
        console.info("Reset Sign");
        setStep(1);
        setPhoneNumber("");
    }

    return (
        <SignContext.Provider value={{
            phoneNumber, setPhoneNumber,
            step, setStep,
            regToken, setRegToken,
            resetSign
        }}>
            {children}
        </SignContext.Provider>
    );
}

export const useSign = () => useContext(SignContext);
