import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => 
{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user && (location.pathname === '/login' || location.pathname === '/registration'))
            {
                history.push('/board');
            }
        });
    }, [user, history, location]);

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}