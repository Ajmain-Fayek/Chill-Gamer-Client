import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `http://localhost:8800/reviews/search?query=${user.email}`
            );
            const data = await res.json();
            if (data.result) {
                setReviews(data.result);
            }
        };
        fetchData();
    }, []);
    console.log(reviews);
    return (
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 p-6 container mx-auto">
            {reviews.length === 0 ? (
                <p className="text-red-600 bg-red-100 border mx-auto border-red-300 px-4 py-2 w-full text-center container rounded-md">
                    You haven't Review Any Games
                </p>
            ) : (
                reviews.map((r) => (
                    <div
                        key={r._id}
                        style={{
                            backgroundImage: `url('${
                                r.poster ||
                                "https://i.ibb.co.com/VQ6VhT4/icon.jpg"
                            }')`,
                        }}
                        className="card bg-cover bg-center rounded-xl hover:drop-shadow-[0_0_5px_#0a0] drop-shadow-[0_0_3px_#3eacff] hover:scale-105 h-[480px] lg:w-[300px] w-[250px]"
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
                                <div className="card-actions justify-center">
                                    <button className="btn btn-accent">
                                        Update Review
                                    </button>
                                    <button className="btn btn-warning">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyReviews;
