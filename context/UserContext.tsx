import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = {
    nameUser: string;
    setnameUser: React.Dispatch<React.SetStateAction<string>>;
    emailUser: string;
    setEmailUser: React.Dispatch<React.SetStateAction<string>>;
    idUser: number;
    setIdUser: React.Dispatch<React.SetStateAction<number>>;
    tokenUser: string;
    setTokenUser: React.Dispatch<React.SetStateAction<string>>;
};

const defaultUserValue: UserType = {
    nameUser: "",
    setnameUser: () => {},
    emailUser: "",
    setEmailUser: () => {},
    idUser: 0,
    setIdUser: () => {},
    tokenUser: "",
    setTokenUser: () => {},
};

const UserContext = createContext<UserType>(defaultUserValue);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [nameUser, setnameUser] = useState("")
    const [emailUser, setEmailUser] = useState("")
    const [idUser, setIdUser] = useState(0)
    const [tokenUser, setTokenUser] = useState("")

    return (
        <UserContext.Provider value={{
            nameUser,
            setnameUser,
            emailUser,
            setEmailUser,
            idUser,
            setIdUser,
            tokenUser,
            setTokenUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}