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
    const [totalReviews, setTotalReviews] = useState(0);

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

    // Get reviews
    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;
            const res = await fetch(
                `${import.meta.env.VITE_API}/reviews/search?query=${
                    user?.email
                }`
            );
            const data = await res.json();
            if (data.result) {
                setTotalReviews(data.result.length);
            }
        };
        fetchData();
    }, [user, totalReviews]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser);
            if (currentUser?.email) {
                fetch(
                    `${import.meta.env.VITE_API}/users/search?email=${
                        currentUser?.email
                    }`
                )
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Error: ${res.statusText}`);
                        }
                        return res.json();
                    })
                    .then((usr) => {
                        setUser(usr);
                        // console.log(usr);
                    })
                    .catch((err) => {
                        console.error("Failed to fetch user data:", err);
                        setUser(null);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [loading]);

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
        totalReviews,
        setTotalReviews,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
