import React, { createContext, useContext, useState, ReactNode } from "react";

type ProyectType = {
    nameProyect: string;
    setnameProyect: React.Dispatch<React.SetStateAction<string>>;
    idProyect: number;
    setIdProyect: React.Dispatch<React.SetStateAction<number>>;
};

const defaultProyectValue: ProyectType = {
    nameProyect: "",
    setnameProyect: () => {},
    idProyect: 0,
    setIdProyect: () => {},
};

const ProyectContext = createContext<ProyectType>(defaultProyectValue);

interface ProyectProviderProps {
    children: ReactNode;
}

const ProyectProvider = ({ children }: ProyectProviderProps) => {
    const [nameProyect, setnameProyect] = useState("")
    const [idProyect, setIdProyect] = useState(0)

    return (
        <ProyectContext.Provider value={{
            nameProyect,
            setnameProyect,
            idProyect,
            setIdProyect,
        }}>
            {children}
        </ProyectContext.Provider>
    )
}

export {ProyectContext, ProyectProvider}