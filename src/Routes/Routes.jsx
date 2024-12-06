import { createBrowserRouter } from "react-router";
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

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/all-reviews",
                element: <AllReviews />,
                loader: () => fetch("http://localhost:8800/reviews"),
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
                loader: ({ params }) =>
                    fetch(`http://localhost:8800/reviews/${params.id}`),
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
        ],
    },
]);

export default routes;
