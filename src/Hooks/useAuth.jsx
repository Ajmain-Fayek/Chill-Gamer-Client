import { useContext } from "react";
import AuthContext from "../Provider/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);
    // console.log(context)
    return context;
};

export default useAuth;
