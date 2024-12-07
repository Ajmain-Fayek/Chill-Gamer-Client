import React from "react";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../Components/Carousel";
import HightRatedGames from "../Components/HightRatedGames";
import { Fade } from "react-awesome-reveal";
import NewsLater from "../Components/NewsLater";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home : Chill Gamer - A Game Review Application</title>
            </Helmet>
            <Fade duration={500}>
                <div className="mx-auto container p-4">
                    <Carousel />
                </div>
                <HightRatedGames />
                <NewsLater />
            </Fade>
        </>
    );
};

export default Home;
