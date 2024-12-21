import { createBrowserRouter, data } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import PrivateRouter from "../Provider/PrivateRouter";
import AddReviews from "../Pages/AddReviews";
import MyReviews from "../Pages/MyReviews";
import AllReviews from "../Pages/AllReviews";
import Login from "../Components/Login";
import Register from "../Components/Register";
import MyWatchlist from "../Pages/MyWatchlist";
import Profile from "../Pages/Profile";
import ReviewDetails from "../Pages/ReviewDetails";
import UpdateProfile from "../Pages/UpdateProfile";
import Page404 from "../Components/Page404";
import axios from "axios";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Page404 />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: () => fetch(`${import.meta.env.VITE_api_url}/reviews`),
            },
            {
                path: "/all-reviews",
                element: <AllReviews />,
                loader: () => fetch(`${import.meta.env.VITE_api_url}/reviews`),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/:id",
                element: <ReviewDetails />,
                loader: async ({ params }) => {
                    try {
                        const response = await axios.get(
                            `${import.meta.env.VITE_api_url}/reviews/${
                                params.id
                            }`
                        );
                        return response.data.result; // Return the result for the loader
                    } catch (error) {
                        console.error("Error fetching review details:", error);
                        throw new Error("Failed to load review details");
                    }
                },
            },
            {
                path: "/add-reviews",
                element: (
                    <PrivateRouter>
                        <AddReviews />
                    </PrivateRouter>
                ),
            },
            {
                path: "/my-watchlist",
                element: (
                    <PrivateRouter>
                        <MyWatchlist />
                    </PrivateRouter>
                ),
            },
            {
                path: "/my-reviews",
                element: (
                    <PrivateRouter>
                        <MyReviews />
                    </PrivateRouter>
                ),
            },
            {
                path: "/profile",
                element: (
                    <PrivateRouter>
                        <Profile />
                    </PrivateRouter>
                ),
            },
            {
                path: "/update-profile",
                element: (
                    <PrivateRouter>
                        <UpdateProfile />
                    </PrivateRouter>
                ),
            },
        ],
    },
]);

export default routes;
