import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const authorization = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
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
                }
            }
            setIsLoading(false); 
        };
        authorization();
    }, []);

    return { isAuthenticated, isAdmin, isLoading }; 
};

export default useAuth;
