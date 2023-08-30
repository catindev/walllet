import React, { useState, useContext } from 'react';

const RegistrationContext = React.createContext();

export const RegistrationProvider = ({ children }) => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const resetRegistration = () => {
        console.info("Reset registration");
        setStep(1);
        setPhone("");
        setCode("");
        setName("");
        setEmail("");
    }

    return (
        <RegistrationContext.Provider value={{
            step, setStep,
            phone, setPhone,
            code, setCode,
            name, setName,
            email, setEmail,
            resetRegistration
        }}>
            {children}
        </RegistrationContext.Provider>
    );
}

export const useRegistration = () => {
    return useContext(RegistrationContext);
}
