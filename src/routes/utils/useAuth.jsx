import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null)

    const refreshAuthState = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/check-token`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    const { role } = jwtDecode(token)
                    const tokenObj = jwtDecode(token)
                    setUserData(tokenObj)
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
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    setUserData(null);
                } else {
                    console.error('An error occurred:', error);
                }
            }
        } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUserData(null);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        refreshAuthState();
    }, [refreshAuthState]);

    return { isAuthenticated, isAdmin, isLoading, userData, refreshAuthState };
};

export default useAuth;
