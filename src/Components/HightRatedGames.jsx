import React from "react";
import { useLoaderData } from "react-router";

const HightRatedGames = () => {
    const { result } = useLoaderData();
    console.log(result);
    return <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold lg:text-6xl sm:text-3xl md:text-4xl">Hi Rated Games</h2>
    </div>;
};

export default HightRatedGames;
