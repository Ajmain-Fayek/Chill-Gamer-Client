import React from "react";
import { Link } from "react-router";

const Page404 = () => {
    return (
        <Link to={"/"} className="w-full">
            <img
                className="w-full h-[100vh] object-contain object-center"
                src="https://i.ibb.co.com/hZcwcRS/404.png"
                alt=""
            />
        </Link>
    );
};

export default Page404;
