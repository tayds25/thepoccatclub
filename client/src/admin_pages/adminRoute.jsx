import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check local storage for user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        const user = JSON.parse(storedUser);
        setIsAdmin(user.isAdmin === true);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAdmin ? <Outlet /> : <Navigate to="/account" replace />;
};

export default AdminRoute;