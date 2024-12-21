import { useState, useEffect } from "react";
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
import useAxiosSequre from "../Hooks/useAxiosSequre";
import AuthContext from "./AuthContext";
// GOOGLE AUTH PROVDER
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // Theme Toggler
    const axiosSequre = useAxiosSequre();
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
        setLoading(true);
        return signOut(auth);
    };

    // DELETE User Account
    const deleteAccount = () => {
        return deleteUser(auth.currentUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log("Current User: ", currentUser?.email);

            if (currentUser?.email) {
                axiosSequre
                    .post(`/jwt`, { email: currentUser.email })
                    .then((res) => {
                        console.log("State Captured", res.data);

                        // Get User Data from DataBase
                        axiosSequre
                            .get(`/users/search?email=${currentUser?.email}`)
                            .then((res) => {
                                console.log("Current User: ", res.data?.email);
                                setUser(res.data);
                                setLoading(false);
                            })
                            .catch((err) => {
                                console.error(
                                    "Failed to fetch user data:",
                                    err
                                );
                                setUser(null);
                                setLoading(false);
                            });
                    })
                    .catch((err) => {
                        console.error("Failed to fetch user data:", err);
                        setUser(null);
                        setLoading(false);
                    });
            } else {
                axiosSequre.post(`/logout`, {}).then((res) => {
                    console.log("log out:", res.data);
                    setUser(null);
                    setLoading(false);
                });
            }
        });

        return () => unsubscribe();
    }, []);

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
