import React, { useState, useContext } from "react";
import {
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagramSquare,
    FaLinkedin,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";

const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { deleteAccount, user, totalReviews } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validate user data
    const userName = user?.displayName || "Guest";
    const userEmail = user?.email || "demo@demo.com";
    const userPhoto =
        user?.photoUrl || "https://i.ibb.co.com/NjcKdp9/asset5.jpg";

    // Delete Account
    const handleDeleteAcc = async () => {
        if (!user || !user._id) {
            Swal.fire({
                title: "Error",
                text: "No user data found to delete.",
                icon: "error",
            });
            setOpenModal(false);
            return;
        }

        setIsDeleting(true);
        try {
            await deleteAccount();
            const response = await fetch(
                `${import.meta.env.VITE_API}/users/${user._id}`,
                { method: "DELETE" }
            );
            if (!response.ok)
                throw new Error("Failed to delete account from server");

            Swal.fire({
                title: "Account Deleted",
                text: "Your account has been deleted successfully.",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error) {
            Swal.fire({
                title: "Error",
                text:
                    error.message ||
                    "Something went wrong while deleting your account.",
                icon: "error",
            });
        } finally {
            setIsDeleting(false);
            setOpenModal(false);
        }
    };

    // Update Profile Page Navigate
    const handleUpdateProfileBTN = () => {
        navigate("/update-profile");
    };

    return (
        <div className="mb-28">
            <Helmet>
                <title>My Profile | {userName}</title>
            </Helmet>
            <div className="max-w-screen-2xl mx-auto">
                <Fade duration={600}>
                    <div className="flex border rounded-2xl shadow-xl mx-auto mt-2 max-w-[350px] flex-col items-center justify-center space-y-4 p-8">
                        <div className="group relative">
                            <img
                                width={110}
                                height={110}
                                className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
                                src={userPhoto}
                                alt="User avatar"
                            />
                            <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-base-100 bg-green-500"></span>
                        </div>

                        {/* Name and Title */}
                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl">{userName}</h1>
                            <p className="text-sm">{userEmail}</p>
                        </div>

                        {/* Bio */}
                        <p className="pb-2 text-center text-sm">
                            Total Games Reviewed: {totalReviews || 0}
                        </p>

                        {/* Social icons */}
                        <div className="flex justify-between gap-4 py-2">
                            {[
                                FaInstagramSquare,
                                FaFacebookSquare,
                                FaLinkedin,
                                FaGithubSquare,
                            ].map((Icon, index) => (
                                <div
                                    key={index}
                                    className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)] duration-300 hover:scale-150"
                                >
                                    <Icon
                                        style={{ fontSize: "1.25rem" }}
                                        aria-hidden="true"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <button
                            onClick={handleUpdateProfileBTN}
                            className="w-full rounded-full py-2 text-[12px] font-semibold text-sky-700 ring-1 ring-sky-700 hover:bg-sky-700 hover:text-white sm:text-sm md:text-base"
                        >
                            Update Profile
                        </button>

                        {/* Modal Trigger */}
                        <div className="mx-auto w-full">
                            <button
                                onClick={() => setOpenModal(true)}
                                className="w-full rounded-full py-2 text-[12px] font-semibold text-red-700 ring-1 ring-red-700 hover:bg-red-700 hover:text-white sm:text-sm md:text-base"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </Fade>
            </div>

            {/* Modal */}
            {openModal && (
                <div
                    onClick={() => setOpenModal(false)}
                    className="fixed z-[100] w-screen h-screen inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-md rounded-lg bg-red-50 border border-red-200 p-6 drop-shadow-lg"
                    >
                        <svg
                            onClick={() => setOpenModal(false)}
                            className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                        </svg>
                        <h1 className="mb-2 text-2xl font-semibold">
                            {userName}
                        </h1>
                        <p className="mb-5 text-sm opacity-80">
                            This action is not reversible! <br /> Are you sure
                            you want to <b className="text-red-700">Delete</b>{" "}
                            your account?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="rounded-md bg-emerald-600 px-6 py-[6px] text-white hover:bg-emerald-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAcc}
                                disabled={isDeleting}
                                className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                            >
                                {isDeleting ? "Deleting..." : "Yes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
