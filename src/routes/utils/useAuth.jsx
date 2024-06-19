import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const { role } = decodedToken;
                setIsAuthenticated(true);
                setIsAdmin(role === '1');
                setIsUser(role === '0');
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
    }, []);

    return { isAuthenticated, isAdmin, isUser };
};

export default useAuth;
