import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { Fade } from "react-awesome-reveal";

const MyWatchlist = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8800/users/${user._id}`);
            const data = await res.json();
            if (data.result) {
                setReviews(data.result);
            }
        };
        fetchData();
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EA4744",
            cancelButtonColor: "#D2B48C",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8800/watchlist/${user._id}/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message === "Item removed successfully") {
                            setReviews(reviews.filter((r) => r._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: data.message,
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Failed!",
                                text: data.message,
                                icon: "error",
                            });
                        }
                    });
            }
        });
    };
    // console.log(reviews);
    return (
        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 py-6 sm:px-6  container mx-auto">
            <Helmet>
                <title>
                    My Watchlist | Chill Gamer : A Game Review Application
                </title>
            </Helmet>
            {reviews.length === 0 ? (
                <div className=" w-full container">
                    <Fade duration={600}>
                        <p className="text-red-600 bg-red-100 border mx-auto border-red-300 px-4 py-2 w-full text-center rounded-md">
                            You haven't Watchlist Any Reviews
                        </p>
                    </Fade>
                </div>
            ) : (
                <div className="overflow-x-auto container mx-auto">
                    <Fade duration={600}>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>Publishing Year</th>
                                    <th>Genres</th>
                                    <th>Rating / 5.00</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {reviews.map((r, index) => (
                                <tbody key={r._id}>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>{index + 1}</th>
                                        <td>{r.title}</td>
                                        <td>{r.publishingYear}</td>
                                        <td>{r.genres}</td>
                                        <td>{r.rating}</td>
                                        <td>
                                            <div className="flex gap-4 w-fit">
                                                <Link
                                                    to={`/${r._id}`}
                                                    className="btn btn-square btn-sm rounded-md bg-[#0a0] text-white hover:bg-[#0c0]"
                                                >
                                                    <FaEye
                                                        style={{
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(r._id)
                                                    }
                                                    className="btn btn-square btn-sm rounded-md bg-[#EA4744] text-gray-200 hover:bg-[#b33533]"
                                                >
                                                    <MdDelete
                                                        style={{
                                                            fontSize: "1rem",
                                                        }}
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </Fade>
                </div>
            )}
        </div>
    );
};

export default MyWatchlist;
