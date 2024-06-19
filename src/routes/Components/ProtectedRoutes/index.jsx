import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../../../components';
import useAuth from '../../utils/useAuth';

const ProtectedRoute = ({ children, adminOnly }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, isAdmin } = useAuth();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        alert('Please login to access this page.');
        return <Navigate to="/" replace />;
    }

    if (adminOnly && !isAdmin) {
        alert('You are not authorized to view this page.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
