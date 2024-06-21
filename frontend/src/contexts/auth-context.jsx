import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
    user: null,
    subscription: [],
    login: ()=>{},
    logout: ()=>{},
    updateSubscription: ()=>{},
});

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const loggedInUser = localStorage.getItem('user');
        const teamSubscription = localStorage.getItem('user-subscription');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        if(teamSubscription){
            setSubscription(JSON.parse(teamSubscription));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/auth');
    };

    const updateSubscription = (teamIds) => {
        setSubscription(teamIds);
        localStorage.setItem('user-subscription', JSON.stringify(teamIds));
    }

    return (
        <AuthContext.Provider value={{ user, subscription, login, logout, updateSubscription }}>
            {props.children}
        </AuthContext.Provider>
    );
};

