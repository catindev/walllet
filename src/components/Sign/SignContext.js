import React, { useState, useContext } from 'react';

const SignContext = React.createContext();

export const SignProvider = ({ children }) => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); 
    const [smsCode, setSmsCode] = useState("");
    const [name, setName] = useState("");
    const [regToken, setRegToken] = useState("");
    const resetSign = () => {
        console.info("Reset Sign");
        setStep(1);
        setPhone("");
        setPassword("");
        setSmsCode("");
        setName("");
    }

    return (
        <SignContext.Provider value={{
            step, setStep,
            phone, setPhone,
            password, setPassword,
            smsCode, setSmsCode,
            name, setName,
            regToken, setRegToken,
            resetSign
        }}>
            {children}
        </SignContext.Provider>
    );
}

export const useSign = () => useContext(SignContext);
