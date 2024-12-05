import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Theme Toggler
    const [themeToggle, setThemeToggle] = useState(true);
    const authInfo = { themeToggle, setThemeToggle };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
