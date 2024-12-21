import { createContext } from "react";
import AuthProvider from "./AuthProvider";

const AuthContext = createContext(AuthProvider);
export default AuthContext;
