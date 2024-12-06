import React from "react";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../Components/Carousel";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home : Chill Gamer - A Game Review Application</title>
            </Helmet>
            <div className="mx-auto container p-4"><Carousel/></div>
        </>
    );
};

export default Home;
