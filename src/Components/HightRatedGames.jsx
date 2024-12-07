import React from "react";
import { Fade } from "react-awesome-reveal";
import { useLoaderData, useNavigate } from "react-router";
import { Typewriter } from "react-simple-typewriter";

const HightRatedGames = () => {
    const { result } = useLoaderData();
    const hightRatedGames = result
        .filter((g) => parseFloat(g.rating) >= 4.5)
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, 10);
    const navigate = useNavigate();
    const handleExplore = (id) => {
        return navigate(`/${id}`);
    };
    console.log(result);
    return (
        <div className="container mx-auto my-12 p-6">
            <h2 className="text-2xl font-bold lg:text-6xl sm:text-3xl md:text-4xl drop-shadow-[0_0_10px_#0f0]">
                <Typewriter
                    cursor
                    cursorColor="#ff0000"
                    cursorBlinking
                    delaySpeed={1000}
                    deleteSpeed={25}
                    typeSpeed={75}
                    loop={0}
                    words={[
                        "Hi Rated Games",
                        "One Stop Game Review Application",
                        "Your Best Buddy is your Game",
                    ]}
                />
            </h2>
            <div className="flex flex-wrap mt-10 flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 p-6 mb-6 container mx-auto">
                {(hightRatedGames &&
                    hightRatedGames.map((r) => (
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
                                            onClick={() => handleExplore(r._id)}
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
            <button
                onClick={() => navigate("/all-reviews")}
                className="btn block btn-success mx-auto"
            >
                Show More
            </button>
        </div>
    );
};

export default HightRatedGames;
