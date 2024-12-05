import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // If loading true
    if (loading) {
        return (
            <span className="block mx-auto mt-10 loading loading-spinner text-success"></span>
        );
    }

    //  If user found
    if (user) return children;

    //  If no User found
    return <Navigate to="/login" />;
};

export default PrivateRouter;
