import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import { Fade } from "react-awesome-reveal";

const Register = () => {
    const { signUpWithEmailAndPassword, updateUserInfo } =
        useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Register user
    const handleRegister = (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const LastName = e.target.lastName.value;
        const name = firstName + " " + LastName;
        const uname = firstName + LastName;
        const email = e.target.email.value;
        const userName = e.target.userName.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const photoURL = e.target.photoUrl.value;
        // Clear Previous Error messages
        setErrorMsg("");

        // Password validation
        const regexUpperCase = /(?=.*[A-Z])/;
        const regexLowerCase = /(?=.*[a-z])/;
        const regexLength = /.{6,}/;
        if (!regexUpperCase.test(password)) {
            return setErrorMsg("Password Must Contain an UpperCase letter A-Z");
        }
        if (!regexLowerCase.test(password)) {
            return setErrorMsg("Password Must Contain an LowerCase letter a-z");
        }
        if (!regexLength.test(password)) {
            return setErrorMsg("Password Must be at least 6 Character long");
        }
        if (!terms) return setErrorMsg("Accept Terms And Conditions!");

        const obj = {
            displayName: name,
            email,
            userName: userName ? userName : uname,
            photoURL,
        };

        // Create User
        signUpWithEmailAndPassword(email, password)
            .then(() => {
                if (photoURL) {
                    updateUserInfo({ displayName: name, photoURL });
                } else updateUserInfo({ displayName: name });
                fetch(`${import.meta.env.VITE_API}/users`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(obj),
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(
                                `HTTP error! status: ${res.status}`
                            );
                        }
                        return res.json();
                    })
                    // .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                const msg = err.message.match(/\(([^)]+)\)/);
                if (msg) return setErrorMsg(msg[1]);
            })
            .finally(() => navigate("/login"));
    };
    return (
        <Fade duration={500}>
            <div
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/S06q7fm/bg4.jpg')",
                }}
                className="bg-cover bg-center bg-fixed md:py-32 py-12 px-4"
            >
                <div className="max-w-md mx-auto space-y-6 text-[#fff] bg-gray-950/35 rounded-xl border border-gray-600 shadow-md p-6 sm:px-8 sm:py-10 lg:px-12 backdrop-blur-sm">
                    <Helmet>
                        <title>
                            Register | Chill Gamer : A Game Review Application
                        </title>
                    </Helmet>
                    <div className="flex flex-col space-y-1">
                        <h3 className="text-3xl font-bold tracking-tight">
                            Sign Up
                        </h3>
                        <p className="text-sm 400">
                            Please fill in the form to create an account.
                        </p>
                    </div>
                    <div>
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                                <div className="space-y-2 text-sm">
                                    <label
                                        className="text-sm font-medium leading-none"
                                        htmlFor="first_name"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        className="flex h-10 w-full placeholder:text-gray-200 bg-transparent rounded-md border px-3 py-2 focus-visible:outline-none"
                                        id="first_name"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 text-sm">
                                    <label
                                        className="text-sm font-medium leading-none  "
                                        htmlFor="last_name"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border px-3 py-2 bg-transparent placeholder:text-gray-200 focus-visible:outline-none"
                                        id="last_name"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <label
                                    className="text-sm font-medium leading-none  300"
                                    htmlFor="profile_pic"
                                >
                                    User Name
                                </label>
                                <input
                                    className="flex placeholder:text-gray-200 bg-transparent h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none"
                                    id="userName"
                                    placeholder="Enter a Fancy UserName"
                                    name="userName"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label
                                    className="text-sm font-medium leading-none  300"
                                    htmlFor="profile_pic"
                                >
                                    Photo URL
                                </label>
                                <input
                                    className="flex placeholder:text-gray-200 bg-transparent h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none"
                                    id="profile_pic"
                                    placeholder="Enter a Photo URL"
                                    name="photoUrl"
                                    type="url"
                                />
                            </div>
                            <div className="space-y-2 text-sm">
                                <label
                                    className="text-sm font-medium leading-none  300"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="flex h-10 placeholder:text-gray-200 bg-transparent w-full rounded-md border px-3 py-2  focus-visible:outline-none"
                                    id="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="space-y-2 text-sm relative">
                                <label
                                    className="text-sm font-medium leading-none "
                                    htmlFor="password_"
                                >
                                    Password
                                </label>
                                <input
                                    className="flex h-10 w-full placeholder:text-gray-200 bg-transparent rounded-md border px-3 py-2  focus-visible:outline-none"
                                    id="password_"
                                    placeholder="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="p-2 absolute top-6 bg-transparent hover:bg-transparent right-2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="mb-6 flex items-center space-x-2 accent-sky-600">
                                <input
                                    name="terms"
                                    type="checkbox"
                                    id="termsAndConditons"
                                />
                                <label
                                    className="select-none text-sm font-medium"
                                    htmlFor="termsAndConditons"
                                >
                                    I accept all terms and conditions.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md btn bg-transparent text-white border-gray-200 hover:border-gray-200"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                    {errorMsg && (
                        <p className="text-red-100 mt-4 bg-red-50/25 border drop-shadow-[0_0_3px_#000] border-red-100 px-4 py-1 w-fit rounded-md">
                            {errorMsg}
                        </p>
                    )}
                    <p>
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className="link-hover text-blue-600 underline font-semibold"
                        >
                            Signin
                        </Link>
                    </p>
                </div>
            </div>
        </Fade>
    );
};

export default Register;
