import { createContext, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(() => {

    const usuarioGuardado = localStorage.getItem("usuario");

    return usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;

});

const [token, setToken] = useState(() => {

    return localStorage.getItem("token");

});


    const login = (usuario, token) => {

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        localStorage.setItem(
            "token",
            token
        );

        setUsuario(usuario);
        setToken(token);

    };

    const logout = () => {

        localStorage.removeItem("usuario");
        localStorage.removeItem("token");

        setUsuario(null);
        setToken(null);

    };

    return (

        <AuthContext.Provider
            value={{
                usuario,
                token,
                login,
                logout,
                estaAutenticado: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}