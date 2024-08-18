import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext({email: '', password: '', updateForm: (arg1: string, arg2:string) => {}});

const SignUpContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateForm = (newEmail: string, password: string) => {
        setEmail(newEmail);
        setPassword(password)
    }
    if (!UserContext) {
        throw new Error("Context error")
    }

    return (
        <UserContext.Provider value={{ email, password, updateForm }}>
            {children}
        </UserContext.Provider>
    )
}
const useSignUpContext = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error("Context error!")
    }

    return context;

}

export { useSignUpContext, SignUpContextProvider } 