import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
    const { user, setTotalReviews } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `http://localhost:8800/reviews/search?query=${user.email}`
            );
            const data = await res.json();
            if (data.result) {
                setReviews(data.result);
                setTotalReviews(data.result.length);
            } else {
                setTotalReviews(0);
            }
        };
        fetchData();
    }, [reviews]);
    // console.log(reviews);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EA4744",
            cancelButtonColor: "#D2B48C",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8800/reviews/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        if (data.message === "Review Deleted Successfully") {
                            setReviews(reviews.filter((r) => r._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: data.message,
                                icon: "error",
                            });
                        }
                    });
            }
        });
    };
    const handleUpdate = (r) => {
        setOpenModal(true);
        setSelectedReview(r);
    };
    const handleForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); // FormData is a API whitch Collects all form data
        const data = Object.fromEntries(formData); // Convert to an object
        console.log(data);
        fetch(`http://localhost:8800/reviews/${selectedReview._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Review Updated Successfully") {
                    Swal.fire({
                        title: "Success",
                        text: "Review Updated successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setOpenModal(false);
                } else {
                    Swal.fire({
                        title: "Failed!",
                        text: data.message,
                        icon: "error",
                    });
                }
            });
    };
    return (
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 py-6 sm:px-6  container mx-auto">
            <Helmet>
                <title>
                    My Reviews | Chill Gamer : A Game Review Application
                </title>
            </Helmet>
            {reviews.length === 0 ? (
                <p className="text-red-600 bg-red-100 border mx-auto border-red-300 px-4 py-2 w-full text-center container rounded-md">
                    You haven't Reviewed any Game
                </p>
            ) : (
                <div className="overflow-x-auto container mx-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Title</th>
                                <th>Publishing Year</th>
                                <th>Genres</th>
                                <th>Rating / 5.00</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {reviews.map((r, index) => (
                            <tbody key={r._id}>
                                {/* row 1 */}
                                <tr className="hover">
                                    <th>{index + 1}</th>
                                    <td>{r.title}</td>
                                    <td>{r.publishingYear}</td>
                                    <td>{r.genres}</td>
                                    <td>{r.rating}</td>
                                    <td>
                                        <div className="flex gap-4 w-fit">
                                            <Link
                                                to={`/${r._id}`}
                                                className="btn btn-square btn-sm rounded-md bg-[#0a0] text-white hover:bg-[#0c0]"
                                            >
                                                <FaEye
                                                    style={{ fontSize: "1rem" }}
                                                />
                                            </Link>
                                            {/* Review Edit Modal */}
                                            <div className="mx-auto flex items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleUpdate(r)
                                                    }
                                                    className="btn btn-square btn-sm rounded-md bg-[#3C393B] text-gray-200 hover:bg-[#555154]"
                                                >
                                                    <FaPen
                                                        style={{
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </button>
                                                <div
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                    className={`fixed z-[100] flex items-center justify-center ${
                                                        openModal
                                                            ? "opacity-1 visible"
                                                            : "invisible opacity-0"
                                                    } inset-0 h-full w-full bg-black/5 backdrop-blur-sm duration-100`}
                                                >
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${
                                                                selectedReview?.backgroundImg
                                                                    ? selectedReview.backgroundImg
                                                                    : "https://i.ibb.co.com/VQ6VhT4/icon.jpg"
                                                            }')`,
                                                        }}
                                                        onClick={(e_) =>
                                                            e_.stopPropagation()
                                                        }
                                                        className={`absolute bg-cover bg-center modal-box max-w-screen-2xl w-full rounded-xl drop-shadow-2xl${
                                                            openModal
                                                                ? "opacity-1 p-2 border border-green-500  translate-y-12 duration-300"
                                                                : "-translate-y-20 opacity-0 duration-150"
                                                        }`}
                                                    >
                                                        <div className="mx-auto backdrop-blur-sm bg-black/50">
                                                            <svg
                                                                onClick={() =>
                                                                    setOpenModal(
                                                                        false
                                                                    )
                                                                }
                                                                className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g strokeWidth="0"></g>
                                                                <g
                                                                    id="SVGRepo_tracerCarrier"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                                                </g>
                                                            </svg>
                                                            <div className="space-y-3 mx-auto bg-transparent px-6 pb-12 pt-6 rounded-lg">
                                                                <div className="text-center mx-auto">
                                                                    <h2 className="font-bold text-white font-rancho text-2xl md:text-3xl mb-4 drop-shadow-[0_0_5px_#374151]">
                                                                        Update:{" "}
                                                                        {
                                                                            selectedReview?.title
                                                                        }
                                                                    </h2>
                                                                    <p className="text-white drop-shadow-[0_0_5px_#374151]">
                                                                        Other
                                                                        game
                                                                        lovers
                                                                        might
                                                                        get
                                                                        hepful
                                                                        insights
                                                                        from
                                                                        your
                                                                        reviews.
                                                                        A best
                                                                        gamer is
                                                                        always
                                                                        help
                                                                        other
                                                                        gamers.
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <form
                                                                        onSubmit={
                                                                            handleForm
                                                                        }
                                                                        className="space-y-3 mx-auto"
                                                                    >
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Game
                                                                                    Title
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                type="text"
                                                                                placeholder="Game Title"
                                                                                name="gameTitle"
                                                                                defaultValue={
                                                                                    selectedReview?.title
                                                                                }
                                                                                required
                                                                                className="input text-white input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Publishing
                                                                                    Year
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                type="text"
                                                                                defaultValue={
                                                                                    selectedReview?.publishingYear ||
                                                                                    ""
                                                                                }
                                                                                placeholder="Ex: 2024"
                                                                                name="pubYear"
                                                                                className="input text-white input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>

                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Rating
                                                                                    /
                                                                                    5.0
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                defaultValue={
                                                                                    selectedReview?.rating ||
                                                                                    ""
                                                                                }
                                                                                name="rating"
                                                                                type="text"
                                                                                placeholder="Ex: 4.6"
                                                                                className="input text-white input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Genres
                                                                                </span>
                                                                            </div>
                                                                            <select
                                                                                defaultValue={
                                                                                    selectedReview?.genres ||
                                                                                    ""
                                                                                }
                                                                                name="genres"
                                                                                required
                                                                                className="select text-white select-bordered bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            >
                                                                                <option
                                                                                    disabled
                                                                                >
                                                                                    Pick
                                                                                    one
                                                                                </option>
                                                                                <option
                                                                                    value={
                                                                                        "Action"
                                                                                    }
                                                                                    className="bg-transparent text-black"
                                                                                >
                                                                                    Action
                                                                                </option>
                                                                                <option
                                                                                    value={
                                                                                        "RPG"
                                                                                    }
                                                                                    className="bg-transparent text-black"
                                                                                >
                                                                                    RPG
                                                                                </option>
                                                                                <option
                                                                                    value={
                                                                                        "Adventure"
                                                                                    }
                                                                                    className="bg-transparent text-black"
                                                                                >
                                                                                    Adventure
                                                                                </option>
                                                                            </select>
                                                                        </label>

                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Game
                                                                                    Poster
                                                                                    URL
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                defaultValue={
                                                                                    selectedReview?.poster
                                                                                }
                                                                                name="poster"
                                                                                type="url"
                                                                                placeholder=" Ex:  http://example.com/game-poster.jpg"
                                                                                className="input text-white input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Review
                                                                                    Background
                                                                                    Image
                                                                                    URL
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                defaultValue={
                                                                                    selectedReview?.backgroundImg
                                                                                }
                                                                                name="backgroundImg"
                                                                                type="url"
                                                                                placeholder="Ex:  http://example.com/game-background.jpg"
                                                                                className="input text-white input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Detailed
                                                                                    Review
                                                                                </span>
                                                                            </div>
                                                                            <textarea
                                                                                defaultValue={
                                                                                    selectedReview?.details
                                                                                }
                                                                                name="details"
                                                                                className="textarea text-white textarea-bordered h-36 w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                                placeholder="Ex:  This Game Has full control over AWM..."
                                                                            ></textarea>
                                                                        </label>

                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Reviewer's
                                                                                    UserName
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                disabled
                                                                                name="username"
                                                                                type="text"
                                                                                placeholder="username"
                                                                                defaultValue={
                                                                                    user.userName
                                                                                }
                                                                                className="input input-bordered disabled:bg-white/35 disabled:text-white disabled:placeholder:text-white w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <label className="form-control w-full">
                                                                            <div className="label">
                                                                                <span className="label-text font-semibold text-lg text-white">
                                                                                    Reviewer's
                                                                                    Email
                                                                                </span>
                                                                            </div>
                                                                            <input
                                                                                disabled
                                                                                name="email"
                                                                                type="text"
                                                                                placeholder="email"
                                                                                defaultValue={
                                                                                    user.email
                                                                                }
                                                                                className="input input-bordered disabled:bg-white/35 disabled:text-white disabled:placeholder:text-white w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                                                            />
                                                                        </label>
                                                                        <input
                                                                            type="submit"
                                                                            value="Update Review"
                                                                            className="btn w-full rounded-md bg-[#1abd1a] text-white tracking-widest border-[#374151] hover:border-[#374151] drop-shadow-[0_0_1px_#fff]"
                                                                        />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleDelete(r._id)
                                                }
                                                className="btn btn-square btn-sm rounded-md bg-[#EA4744] text-gray-200 hover:bg-[#b33533]"
                                            >
                                                <MdDelete
                                                    style={{ fontSize: "1rem" }}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
