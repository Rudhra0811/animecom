import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout, register as authRegister } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUser(user);
        }
    }, []);

    const login = async (username, password) => {
        const user = await authLogin(username, password);
        setUser(user);
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    const register = async (username, password) => {
        const user = await authRegister(username, password);
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};