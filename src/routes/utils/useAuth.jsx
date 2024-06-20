import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [usernameAuth, setUsernameAuth] = useState(null)

    const refreshAuthState = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            const { role, username } = jwtDecode(token)
            setUsernameAuth(username)
            setIsAuthenticated(true);
            if (role === '1') {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/check-admin`, {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    setIsAdmin(false);
                }
            }
        } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refreshAuthState();
    }, [refreshAuthState]);

    return { isAuthenticated, isAdmin, isLoading, usernameAuth, refreshAuthState };
};

export default useAuth;
