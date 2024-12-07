import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateProfile = () => {
    const { updateUserInfo, user } = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const LastName = e.target.lastName.value;
        const photoURL = e.target.photoUrl.value;
        const displayName = firstName + " " + LastName;

        // Clear previus Error message
        setErrorMsg("");

        // Update user Profile
        updateUserInfo({ displayName, photoURL })
            .then(() => navigate("/my-profile"))
            .catch((err) => {
                const msg = err.message.match(/\(([^)]+)\)/);
                if (msg) return setErrorMsg(msg[1]);
            });
    };
    return (
        <div className="mb-36 md:mb-24">
            <Helmet>
                <title>Update Profile | { user ? user.displayName : "Chill Gamer" }</title>
            </Helmet>
            <div className="max-w-md mx-auto mt-10 p-2">
                <p className="text-sm 400 mb-6">
                    Please fill in the form to Update your account.
                </p>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                        <div className="space-y-2 text-sm">
                            <label
                                className="text-sm font-medium leading-none"
                                htmlFor="first_name"
                            >
                                First Name
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none"
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
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none"
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
                            Photo URL
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none"
                            id="profile_pic"
                            placeholder="Enter a Photo URL"
                            name="photoUrl"
                            type="url"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-md btn btn-neutral "
                    >
                        Update
                    </button>
                </form>
                <Link
                    to="/profile"
                    className="text-blue-600 font-semibold underline mt-3 block"
                >
                    Back to Profile
                </Link>
                {/* Error */}
                {errorMsg && (
                    <p className="text-red-700 bg-red-50 border border-red-100 px-4 py-1 w-fit rounded-md">
                        {errorMsg}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UpdateProfile;
