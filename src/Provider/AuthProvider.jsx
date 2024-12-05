import { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import auth from "../Firebase/Firebase.config";
export const AuthContext = createContext();
// GOOGLE AUTH PROVDER
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // Theme Toggler
    const [themeToggle, setThemeToggle] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign Up with **EMAIL & PASSWORD**
    const signUpWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with **EMAIL & PASSWORD**
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign in with **GOOGLE**
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Update USER INFO
    const updateUserInfo = (obj) => {
        setLoading(true);
        return updateProfile(auth.currentUser, obj);
    };

    // Sign Out User
    const logOutUser = () => {
        return signOut(auth);
    };

    // DELETE User Account
    const deleteAccount = () => {
        return deleteUser(auth.currentUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            fetch(`http://localhost:8800/users/${currentUser.email}`)
                .then((res) => res.json())
                .then((usr) => setUser(usr))
                .then(setLoading(false));
        });

        return () => unsubscribe();
    });
    const authInfo = {
        themeToggle,
        setThemeToggle,
        signUpWithEmailAndPassword,
        signInWithGoogle,
        updateUserInfo,
        deleteAccount,
        setUser,
        logOutUser,
        signInUser,
        user,
        loading,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
