import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_api_url,
    withCredentials: true,
});

const useAxiosSecure = () => {
    // const navigate = useNavigate();
    const { logOutUser } = useAuth();

    useEffect(() => {
        // Request interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response, // Pass through successful responses
            async (error) => {
                console.error("Error in Interceptor:", error);

                const status = error.response?.status; // Access status code safely
                console.log("interceptor status", status);
                if (status === 401 || status === 403) {
                    console.log("Unauthorized or Forbidden - Logging out user");

                    try {
                        await logOutUser();
                        console.log("Logged out user successfully");
                        // navigate("/login"); // Redirect to login page
                    } catch (err) {
                        console.error("Error during logout:", err);
                    }
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Include dependencies to prevent stale closures

    return axiosInstance;
};

export default useAxiosSecure;
