import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddReviews = () => {
    const { user } = useContext(AuthContext);
    const { email, userName } = user;

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const gameTitle = form.gameTitle.value;
        const pubYear = form.pubYear.value;
        const rating = form.rating.value;
        const genres = form.genres.value;
        const poster = form.poster.value;
        const backgroundImg = form.backgroundImg.value;
        const details = form.details.value;

        const obj = {
            title: gameTitle,
            publishingYear: pubYear,
            genres,
            poster,
            backgroundImg,
            details,
            rating,
            userName,
            email,
        };

        fetch("http://localhost:8800/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.result.insertedId);
                if (data.result.insertedId) {
                    Swal.fire({
                        title: "Success",
                        text: "Review added successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    form.reset();
                }
            });
    };
    return (
        <div
            style={{
                backgroundImage: "url('https://i.ibb.co.com/S06q7fm/bg4.jpg')",
            }}
            className="bg-cover bg-center bg-fixed py-12 px-4"
        >
            <Helmet>
                <title>
                    Add Reviews | Chill Gamer : A Game Review Application
                </title>
            </Helmet>
            <div className="space-y-6 w-fit text-white bg-gray-950/35 rounded-xl border border-gray-600 shadow-md mx-auto p-6 sm:px-8 sm:py-10 lg:px-12 backdrop-blur-sm">
                <Link
                    to="/"
                    className="drop-shadow-2xl font-rancho flex items-center gap-1 text-lg max-w-screen-md mx-auto font-semibold px-6 sm:px-0"
                >
                    <p className="drop-shadow-[0_0_5px_#374151] flex items-center gap-1.5 py-1 px-2">
                        <FaArrowLeft style={{ fontSize: ".7rem" }} /> Back to
                        home
                    </p>
                </Link>
                <div className="space-y-3 max-w-screen-md mx-auto bg-transparent px-6 py-12 rounded-lg">
                    <div className="text-center max-w-screen-sm mx-auto">
                        <h2 className="font-bold font-rancho text-2xl md:text-3xl mb-4 drop-shadow-[0_0_5px_#374151]">
                            Add A Game Review
                        </h2>
                        <p className="text-white drop-shadow-[0_0_5px_#374151]">
                            Other game lovers might get hepful insights from
                            your reviews. A best gamer is always help other
                            gamers.
                        </p>
                    </div>
                    <div>
                        <form
                            onSubmit={handleForm}
                            className="space-y-3 max-w-screen-sm mx-auto"
                        >
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Game Title
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Game Title"
                                    name="gameTitle"
                                    required
                                    className="input input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Publishing Year
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="2024"
                                    name="pubYear"
                                    className="input input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Rating / 5.0
                                    </span>
                                </div>
                                <input
                                    name="rating"
                                    type="text"
                                    placeholder="4.6"
                                    className="input input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Genres
                                    </span>
                                </div>
                                <select
                                    required
                                    name="genres"
                                    className="select select-bordered bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                >
                                    <option selected disabled>
                                        Pick one
                                    </option>
                                    <option className="bg-transparent text-black">
                                        Action
                                    </option>
                                    <option className="bg-transparent text-black">
                                        RPG
                                    </option>
                                    <option className="bg-transparent text-black">
                                        Adventure
                                    </option>
                                </select>
                            </label>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Game Poster URL
                                    </span>
                                </div>
                                <input
                                    name="poster"
                                    type="url"
                                    placeholder="http://example.com/game-poster.jpg"
                                    className="input input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Review Background Image URL
                                    </span>
                                </div>
                                <input
                                    name="backgroundImg"
                                    type="url"
                                    placeholder="http://example.com/game-background.jpg"
                                    className="input input-bordered w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Detailed Review
                                    </span>
                                </div>
                                <textarea
                                    name="details"
                                    className="textarea textarea-bordered h-36 w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                    placeholder="This Game Has full control over AWM..."
                                ></textarea>
                            </label>

                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Reviewer's UserName
                                    </span>
                                </div>
                                <input
                                    disabled
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    defaultValue={userName}
                                    className="input input-bordered disabled:bg-white/35 disabled:text-white disabled:placeholder:text-white w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text font-semibold text-lg text-white">
                                        Reviewer's Email
                                    </span>
                                </div>
                                <input
                                    disabled
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    defaultValue={email}
                                    className="input input-bordered disabled:bg-white/35 disabled:text-white disabled:placeholder:text-white w-full bg-transparent border-gray-200 placeholder:text-gray-200 focus:border-green-400"
                                />
                            </label>
                            <input
                                type="submit"
                                value="Add Review"
                                className="btn w-full rounded-md bg-[#1abd1a] text-white tracking-widest border-[#374151] hover:border-[#374151] drop-shadow-[0_0_1px_#fff]"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReviews;
