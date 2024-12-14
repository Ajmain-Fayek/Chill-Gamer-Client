import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../Components/Carousel";
import HightRatedGames from "../Components/HightRatedGames";
import { Fade } from "react-awesome-reveal";
import NewsLater from "../Components/NewsLater";
import ReviersRecomentations from "../Components/ReviersRecomentations";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
    const { themeToggle } = useContext(AuthContext);
    return (
        <>
            <Helmet>
                <title>Home : Chill Gamer - A Game Review Application</title>
            </Helmet>
            <Fade duration={500}>
                <div className="mx-auto container p-4">
                    <Carousel />
                </div>
                <div
                    className={`${themeToggle ? "bg-gray-200" : "bg-gray-800"}`}
                >
                    <HightRatedGames />
                </div>
                <NewsLater />
                <div
                    className={`${
                        themeToggle ? "bg-gray-200" : "bg-gray-800"
                    } py-10 md:py-20`}
                >
                    <div className="container mx-auto flex gap-6 flex-wrap items-center justify-center">
                        <ReviersRecomentations prop="One stop game review website." />
                        <ReviersRecomentations />
                        <ReviersRecomentations prop="I will also recomend my friends" />
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default Home;
