import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Carousel } from "../Components/Carousel";
import { Helmet } from "react-helmet-async";
import { Fade } from "react-awesome-reveal";

const AllReviews = () => {
    const reviews = useLoaderData();
    const navigate = useNavigate();
    // console.log(reviews);
    const handleExplore = (id) => {
        return navigate(`/${id}`);
    };
    return (
        <div>
            <Helmet>
                <title>
                    All Reviews | Chill Gamer : A Game Review Application
                </title>
            </Helmet>
            <Fade duration={500}>
                <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 p-6 mb-6 container mx-auto">
                    {(reviews.result &&
                        reviews.result.map((r) => (
                            <div
                                key={r._id}
                                style={{
                                    backgroundImage: `url('${
                                        r.poster ||
                                        "https://i.ibb.co.com/VQ6VhT4/icon.jpg"
                                    }')`,
                                }}
                                className="card justify-end bg-cover bg-center rounded-xl hover:drop-shadow-[0_0_5px_#0a0] drop-shadow-[0_0_3px_#3eacff] hover:scale-105 h-[480px] lg:w-[300px] w-[250px]"
                            >
                                <div className="rounded-b-xl">
                                    <div className="card-body lg:mt-[270px] mt-[175px] backdrop-blur-sm rounded-b-xl text-white bg-black/35">
                                        <h2 className="card-title drop-shadow-[0_0_5px_#000]">
                                            {r.title}
                                        </h2>
                                        <p className="drop-shadow-[0_0_5px_#000]">
                                            Publishing Year: {r.publishingYear}
                                        </p>
                                        <p className="drop-shadow-[0_0_5px_#000]">
                                            Genres: {r.genres}
                                        </p>
                                        <div className="card-actions justify-end">
                                            <button
                                                onClick={() =>
                                                    handleExplore(r._id)
                                                }
                                                className="btn btn-accent"
                                            >
                                                Explore Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))) || (
                        <p className="text-red-600 bg-red-100 border mx-auto border-red-300 px-4 py-2 w-full text-center container rounded-md">
                            No one Reviewed any Games yet!
                        </p>
                    )}
                </div>
            </Fade>
        </div>
    );
};

export default AllReviews;
