import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setIsAdmin(user.isAdmin === true);
            } else {
                setIsAdmin(false);
            }
            setLoading(false);
        };

        // Initial check
        checkAdminStatus();

        // Listen for storage events (login/logout)
        window.addEventListener('storage', checkAdminStatus);

        // Cleanup
        return () => window.removeEventListener('storage', checkAdminStatus);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#687c57]"></div>
            </div>
        );
    }

    // Return children components directly instead of using Outlet
    return isAdmin ? children : <Navigate to="/account" replace />;
};

export default AdminRoute;