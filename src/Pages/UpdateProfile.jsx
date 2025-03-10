import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateProfile = () => {
    const { updateUserInfo, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        photoURL: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submission handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { firstName, lastName, photoURL } = formData;
        const displayName = `${firstName} ${lastName}`.trim();

        // Clear any previous error messages
        setErrorMsg("");
        setIsSubmitting(true);

        try {
            // Update user info in authentication
            await updateUserInfo({ displayName, photoURL });

            // Update user info in the database
            const response = await fetch(
                `${import.meta.env.VITE_API}/users/${user._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ displayName, photoUrl: photoURL }),
                }
            );

            if (!response.ok) {
                setErrorMsg("Failed to update profile. Please try again.");
                throw new Error("Failed to update profile. Please try again.");
            }

            // Navigate to home and show success message
            navigate("/");
            Swal.fire({
                title: "Success",
                text: "Profile updated successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            const errorMessage =
                error.message.match(/\(([^)]+)\)/)?.[1] || error.message;
            setErrorMsg(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-36 md:mb-24">
            <Helmet>
                <title>
                    Update Profile | {user ? user.displayName : "Chill Gamer"}
                </title>
            </Helmet>
            <div className="max-w-md mx-auto mt-10 p-2">
                <p className="text-sm mb-6">
                    Please fill in the form to update your account.
                </p>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                        <div className="space-y-2 text-sm">
                            <label
                                htmlFor="firstName"
                                className="text-sm font-medium leading-none"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <label
                                htmlFor="lastName"
                                className="text-sm font-medium leading-none"
                            >
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <label
                            htmlFor="photoURL"
                            className="text-sm font-medium leading-none"
                        >
                            Photo URL
                        </label>
                        <input
                            id="photoURL"
                            name="photoURL"
                            type="url"
                            placeholder="Enter a photo URL"
                            value={formData.photoURL}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded-md btn btn-neutral ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                </form>
                <Link
                    to="/profile"
                    className="text-blue-600 font-semibold underline mt-3 block w-fit"
                >
                    Back to Profile
                </Link>
                {errorMsg && (
                    <p
                        role="alert"
                        className="text-red-700 bg-red-50 border border-red-100 px-4 py-1 w-fit rounded-md mt-4"
                    >
                        {errorMsg}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UpdateProfile;
