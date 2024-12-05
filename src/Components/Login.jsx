import React, { useContext, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
    const { signInWithGoogle, signInUser, setEmail, setUser } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgGoogle, setErrorMsgGoogle] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();

    // Sign in with ** EMAIL & PASS **
    const handleSignIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Clear Previous Error Message
        setErrorMsg("");

        if (!email || !password)
            return setErrorMsg("Please Enter Your Email & Password to Sign In");

        // Sign in User
        signInUser(email, password)
            .then(() => navigate("/"))
            .catch((err) => {
                const msg = err.message.match(/\(([^)]+)\)/);
                if (msg) return setErrorMsg(msg[1]);
            });
    };

    //Sign in With **GOOGLE**
    const handleGoogleSignIn = () => {
        // Clear Previus Error Message
        setErrorMsgGoogle("");
        signInWithGoogle()
            .then((res) =>
                fetch("http://localhost:8800/users", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        userName: res.user.displayName,
                        displayName: res.user.displayName,
                        email: res.user.email,
                        photoUrl: res.user.photoURL,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => setErrorMsgGoogle(data.message))
            )
            .then(() => navigate("/"))
            .catch((err) => {
                const msg = err.message.match(/\(([^)]+)\)/);
                if (msg) return setErrorMsgGoogle(msg[1]);
            });
    };

    // Handle Forget Password
    const handleForgetPassword = () => {
        setErrorMsg("");
        const email = emailRef.current.value;
        if (!email) {
            setEmail(email);
        }
        return navigate("/forget-password");
    };
    return (
        <div
            style={{
                backgroundImage: "url('https://i.ibb.co.com/S06q7fm/bg4.jpg')",
            }}
            className="bg-cover bg-center md:py-32 py-12 px-4"
        >
            <div className="max-w-screen-lg text-gray-100 bg-gray-950/35 rounded-xl border border-gray-600 shadow-md mx-auto p-6 sm:px-8 sm:py-10 lg:px-12 backdrop-blur-sm">
                <Helmet>
                    <title>
                        Login | Chill Gamer : A Game Review Application
                    </title>
                </Helmet>
                <div className="flex flex-col justify-between space-x-0 sm:flex-row sm:space-x-12">
                    <div className="mb-8 w-full sm:mb-0 sm:w-1/2">
                        {/* Left side form */}
                        <h2 className="mb-6 text-3xl font-semibold tracking-tight">
                            Sign In
                        </h2>
                        <form onSubmit={handleSignIn}>
                            <div className="mb-4 flex flex-col space-y-4 relative">
                                <input
                                    className="flex h-10 w-full bg-transparent rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                                    placeholder="Username"
                                    type="email"
                                    name="email"
                                    ref={emailRef}
                                />
                                <input
                                    className="flex h-10 w-full bg-transparent rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="p-2 absolute top-11 bg-transparent hover:bg-transparent right-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="mb-6 flex items-center space-x-2 bg-transparent">
                                <input
                                    name="remember"
                                    type="checkbox"
                                    id="keep_signed_in"
                                    className="bg-transparent"
                                />
                                <label
                                    className="select-none text-sm font-medium"
                                    htmlFor="keep_signed_in"
                                >
                                    Keep me signed in
                                </label>
                            </div>
                            <button className="inline-flex border-gray-200 text-gray-100 bg-transparent h-10 w-full items-center justify-center rounded-md btn px-4 py-2 text-sm font-medium uppercase ">
                                Sign In
                            </button>
                        </form>
                        <p className="mt-6 flex gap-1 text-sm">
                            Did you
                            <Link
                                onClick={handleForgetPassword}
                                className="text-blue-400 font-semibold underline"
                            >
                                forget your password?
                            </Link>
                        </p>
                        {/* Error */}
                        {errorMsg && (
                            <p className="text-red-100 mt-4 bg-red-50/25 border drop-shadow-[0_0_3px_#000] border-red-100 px-4 py-1 w-fit rounded-md">
                                {errorMsg}
                            </p>
                        )}
                    </div>
                    {/* Right side content */}
                    <div className="w-full sm:w-1/2">
                        <p className="mb-6  text-sm text-white drop-shadow-[0_0_1px_#000]">
                            If you don&apos;t already have an account click the
                            button below to create your account.
                        </p>
                        <Link
                            to={"/register"}
                            className="mb-2 inline-flex h-10 text-gray-100 w-full items-center justify-center rounded-md border-gray-200  px-4 py-2 text-sm font-medium uppercase btn bg-transparent "
                        >
                            Create Account
                        </Link>
                        <p className="my-4 text-center">OR</p>
                        <button
                            onClick={handleGoogleSignIn}
                            className="mb-2 btn bg-transparent text-gray-100 flex h-10 w-full items-center justify-center gap-1 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium"
                        >
                            <FcGoogle style={{ fontSize: "1.25rem" }} />
                            SIGN IN WITH GOOGLE
                        </button>
                        {/* Error */}
                        {errorMsgGoogle && (
                            <p className="text-red-100 mt-4 bg-red-50/25 border drop-shadow-[0_0_3px_#000] border-red-100 px-4 py-1 w-fit rounded-md">
                                {errorMsgGoogle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
