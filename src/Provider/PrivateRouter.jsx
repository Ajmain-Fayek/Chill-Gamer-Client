import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // If loading true
    if (loading) {
        return (
            <div className="h-[600px] bg-gray-900">
                <span className="block mx-auto py-10 loading loading-spinner text-success"></span>
            </div>
        );
    }

    //  If user found
    if (user) return children;

    //  If no User found
    return <Navigate to="/login" />;
};

export default PrivateRouter;
