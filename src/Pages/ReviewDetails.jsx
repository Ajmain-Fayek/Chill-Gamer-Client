import React from "react";
import { useLoaderData } from "react-router";

const ReviewDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return <div>ReviewDetails</div>;
};

export default ReviewDetails;
