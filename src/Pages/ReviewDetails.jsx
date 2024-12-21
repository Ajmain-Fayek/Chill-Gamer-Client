import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSequre";

const ReviewDetails = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
    const result = useLoaderData();
    const axiosSequre = useAxiosSecure();
    const {
        backgroundImg,
        details,
        email,
        genres,
        poster,
        publishingYear,
        rating,
        title,
        userName,
        _id,
    } = result;
    // console.log(result);
    const handleWatchlist = (id) => {
        if (!user) {
            return navigate("/login");
        }
        axiosSequre
            .patch(`${import.meta.env.VITE_api_url}/users/${user._id}`, {
                watchList: id,
            })
            .then((res) => {
                console.log(res.status);

                if (res.data?.message) {
                    Swal.fire({
                        title: "warning",
                        text: res.data.message,
                        icon: "warning",
                        showConfirmButton: true,
                    });
                }
                if (res.data?.result) {
                    Swal.fire({
                        title: "Success",
                        text: "Game Added successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })
            .catch((error) => {
                const status = error.response.status;
                if (status === 401 || status === 403) {
                    return Swal.fire({
                        title: "Unauthorize Access!",
                        icon: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "LogOut",
                        confirmButtonColor: "#ff0000",
                    }).then(() =>
                        logOutUser().then(() => {
                            navigate("/login");
                            console.log("User Logged out seccesfully");
                        })
                    );
                }
            });
    };

    return (
        <div>
            <div
                style={{
                    backgroundImage: `url('${
                        backgroundImg
                            ? backgroundImg
                            : "https://i.ibb.co.com/S06q7fm/bg4.jpg"
                    }')`,
                }}
                className="bg-cover text-white bg-center bg-fixed px-6 md:py-20 py-8"
            >
                <div className="container mx-auto">
                    <Link
                        to="/"
                        className="font-rancho border w-fit flex items-center gap-1 text-lg max-w-screen-2xl ml-2 backdrop-blur-md border-gray-500 p-2 rounded-md font-semibold mb-4"
                    >
                        <p className="drop-shadow-[0_0_5px_#000] text-white flex items-center gap-1.5">
                            <FaArrowLeft style={{ fontSize: ".7rem" }} /> Back
                            to home
                        </p>
                    </Link>
                    <div className="gap-4 card flex-col items-center md:flex-row rounded-xl bg-black/35 shadow-md backdrop-blur-md border border-green-500 p-4 md:p-10 mx-auto">
                        <div className="md:w-1/2 w-full">
                            <figure className="w-fit mx-auto md:p-4 p-1">
                                <img
                                    className="w-full block h-[455px] p-1 mx-auto object-contain rounded-xl drop-shadow-[0_0_5px_#0a0] hover:scale-105"
                                    src={poster}
                                    alt={title}
                                />
                            </figure>
                        </div>
                        <div className="flex justify-between md:w-1/2 w-full">
                            <div className="flex flex-col justify-center gap-4 w-full">
                                <h2 className="drop-shadow-[0_0_5px_#331A15] card-title font-rancho text-2xl lg:text-3xl">
                                    {title}
                                </h2>
                                <p className="drop-shadow-[0_0_8px_#000]">
                                    <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                        Title:
                                    </b>{" "}
                                    {title}
                                </p>
                                <p className="drop-shadow-[0_0_8px_#000]">
                                    <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                        Publishing Year:
                                    </b>{" "}
                                    {publishingYear}
                                </p>
                                <p className="drop-shadow-[0_0_8px_#000]">
                                    <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                        Genres:
                                    </b>{" "}
                                    {genres}
                                </p>
                                <p className="drop-shadow-[0_0_8px_#000]">
                                    <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                        Rating:
                                    </b>{" "}
                                    {rating}
                                </p>

                                <p className="drop-shadow-[0_0_8px_#000]">
                                    <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                        Review Details:
                                    </b>{" "}
                                    {details}
                                </p>
                                <div>
                                    <p className="drop-shadow-[0_0_8px_#000]">
                                        <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                            Reviewd By:
                                        </b>{" "}
                                        {userName}
                                    </p>
                                    <p className="drop-shadow-[0_0_8px_#000]">
                                        <b className="font-semibold text-green-500 drop-shadow-[0_0_8px_#000]">
                                            Email :
                                        </b>{" "}
                                        {email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleWatchlist(_id)}
                                    className="btn"
                                >
                                    Add to Watchlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;
