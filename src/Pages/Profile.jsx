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

const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const { deleteAccount, user, totalReviews } =
        useContext(AuthContext);
    const navigate = useNavigate();

    // Delete Account
    const handleDeleteAcc = () => {
        deleteAccount();
        setOpenModal(false);
        navigate("/");
    };

    // Update Profile Page Navigate
    const handleUpdateProfileBTN = () => {
        navigate("/update-profile");
    };
    return (
        <div className="mb-28">
            <Helmet>
                <title>
                    My Profile | {user ? `${user.displayName}` : "R Coupons"}
                </title>
            </Helmet>
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex border rounded-2xl shadow-xl mx-auto mt-2 max-w-[350px] flex-col items-center justify-center space-y-4 p-8">
                    <div className="group relative">
                        <img
                            width={110}
                            height={110}
                            className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
                            src={
                                user?.photoUrl ||
                                "https://i.ibb.co.com/NjcKdp9/asset5.jpg"
                            }
                            alt="card navigate ui"
                        />
                        <span className="absolute bottom-3 right-0 h-5 w-5 rounded-full border-[3px] border-base-100 bg-green-500"></span>
                    </div>
                    {/* Name and Title */}
                    <div className="space-y-1 text-center">
                        <h1 className="text-2xl ">
                            {user.displayName ? user.displayName : "Guest"}
                        </h1>
                        <p className="text-sm ">
                            {user.userName ? user.userName : "UserName"}
                        </p>
                        <p className="text-sm ">
                            {user.email ? user.email : "demo@demo.com"}
                        </p>
                    </div>

                    {/* bio  */}
                    <p className="pb-2 text-center text-sm ">Total Games Reviewd: {totalReviews}</p>

                    {/* social icons  */}
                    <div className="flex justify-between gap-4 py-2">
                        <div className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150">
                            <FaInstagramSquare
                                style={{ fontSize: "1.25rem" }}
                            />
                        </div>
                        <div className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150">
                            <FaFacebookSquare style={{ fontSize: "1.25rem" }} />
                        </div>
                        <div className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150">
                            <FaLinkedin style={{ fontSize: "1.25rem" }} />
                        </div>
                        <div className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150">
                            <FaGithubSquare style={{ fontSize: "1.25rem" }} />
                        </div>
                    </div>
                    <button
                        onClick={handleUpdateProfileBTN}
                        className="w-full rounded-full py-2 text-[12px] font-semibold text-sky-700 ring-1 ring-sky-700 hover:bg-sky-700 hover:text-white sm:text-sm md:text-base"
                    >
                        Update Profile
                    </button>
                    {/* Modal */}
                    <div className="mx-auto w-full">
                        {/* Modal Activator button */}
                        <button
                            onClick={() => setOpenModal(true)}
                            className="w-full rounded-full py-2 text-[12px] font-semibold text-red-700 ring-1 ring-red-700 hover:bg-red-700 hover:text-white sm:text-sm md:text-base"
                        >
                            Delete Account
                        </button>
                        <div
                            onClick={() => setOpenModal(false)}
                            className={`fixed z-[100] w-screen ${
                                openModal
                                    ? "visible opacity-100"
                                    : "invisible opacity-0"
                            } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
                        >
                            <div
                                onClick={(e_) => e_.stopPropagation()}
                                className={`absolute max-w-md rounded-lg bg-red-50 border border-red-200 p-6 drop-shadow-lg ${
                                    openModal
                                        ? "opacity-1 duration-300"
                                        : "scale-110 opacity-0 duration-150"
                                }`}
                            >
                                <svg
                                    onClick={() => setOpenModal(false)}
                                    className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                </svg>
                                <h1 className="mb-2 text-2xl font-semibold">
                                    {user.displayName}
                                </h1>
                                <p className="mb-5 text-sm opacity-80">
                                    This action is not Reversible! <br /> Are
                                    you sure you want to{" "}
                                    <b className="text-red-700">Delete</b> your
                                    Account?
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
                                        className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
