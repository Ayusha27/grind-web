import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const ProtectedRoute = ({ fallbackPath = '/admin/login' }: { fallbackPath?: string }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to={fallbackPath} replace />;
    }

    // If we had role checking, we could decode JWT here and check role === 'admin'
    return <Outlet />;
};

export default ProtectedRoute;
