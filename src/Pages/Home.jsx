import React from "react";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../Components/Carousel";
import HightRatedGames from "../Components/HightRatedGames";
import { Fade } from "react-awesome-reveal";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home : Chill Gamer - A Game Review Application</title>
            </Helmet>
            <div className="mx-auto container p-4">
                <Carousel />
            </div>
            <Fade duration={500}>
                <HightRatedGames />
            </Fade>
        </>
    );
};

export default Home;
