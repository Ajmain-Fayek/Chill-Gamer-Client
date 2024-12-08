import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Fade } from "react-awesome-reveal";

const AllReviews = () => {
    const reviews = useLoaderData();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [genresQuery, setGenresQuery] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // New state for sorting
    const [showAll, setShowAll] = useState(false);
    const initialVisibleCards = 15;

    // Filtered data based on search and genres query
    const filteredData = reviews.result
        .filter((d) => {
            const matchesSearch = searchQuery
                ? d.title.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesGenre = genresQuery
                ? d.genres.toLowerCase().includes(genresQuery.toLowerCase())
                : true;
            return matchesSearch && matchesGenre;
        })
        .sort((a, b) => {
            if (sortOrder === "rating") {
                return b.rating - a.rating; // Descending by rating
            }
            if (sortOrder === "publishingYear") {
                return b.publishingYear - a.publishingYear; // Descending by year
            }
            return 0; // Default order if no sort is selected
        });

    // Data to display based on "Show All" state
    const cardToShow = showAll
        ? filteredData
        : filteredData.slice(0, initialVisibleCards);

    // Handle input changes
    const handleSearchInput = (event) => setSearchQuery(event.target.value);
    const handleGenresInput = (event) => setGenresQuery(event.target.value);
    const handleSortInput = (event) => setSortOrder(event.target.value);

    // Navigate to detailed review
    const handleExplore = (id) => navigate(`/${id}`);

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setGenresQuery("");
        setSortOrder("");
    };

    return (
        <div>
            <Helmet>
                <title>
                    {filteredData.length > 0
                        ? "All Reviews | Chill Gamer"
                        : "No Reviews Found | Chill Gamer"}
                </title>
            </Helmet>
            <Fade duration={500}>
                <div className="container mx-auto flex justify-center mt-10">
                    <div className="mb-4 container flex items-center p-2 rounded-md mx-auto w-full">
                        <input
                            className="flex w-3/5 h-12 rounded-l-lg border px-3 py-2 text-sm focus:outline-none focus:border-green-400 focus:ring-1"
                            placeholder="Search"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInput}
                        />
                        <label className="w-1/5">
                            <select
                                onChange={handleGenresInput}
                                value={genresQuery}
                                name="genres"
                                className="select w-full rounded-none select-bordered bg-transparent border-gray-200 focus:ring-1 focus:outline-none placeholder:text-gray-200 focus:border-green-400"
                            >
                                <option value="" disabled>
                                    Genres
                                </option>
                                <option
                                    value="Action"
                                    className="bg-transparent text-black"
                                >
                                    Action
                                </option>
                                <option
                                    value="RPG"
                                    className="bg-transparent text-black"
                                >
                                    RPG
                                </option>
                                <option
                                    value="Adventure"
                                    className="bg-transparent text-black"
                                >
                                    Adventure
                                </option>
                            </select>
                        </label>
                        <label className="w-1/5">
                            <select
                                onChange={handleSortInput}
                                value={sortOrder}
                                name="sort"
                                className="select w-full rounded-none select-bordered bg-transparent border-gray-200 focus:ring-1 focus:outline-none placeholder:text-gray-200 focus:border-green-400"
                            >
                                <option value="" disabled>
                                    Sort
                                </option>
                                <option
                                    value="rating"
                                    className="bg-transparent text-black"
                                >
                                    Rating
                                </option>
                                <option
                                    value="publishingYear"
                                    className="bg-transparent text-black"
                                >
                                    Publish Year
                                </option>
                            </select>
                        </label>
                        <button
                            onClick={clearFilters}
                            className="btn w-1/5 rounded-none rounded-r-lg border-gray-200 btn-warning"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center md:gap-10 sm:gap-6 gap-10 p-6 mb-6 container mx-auto">
                    {cardToShow.length > 0 ? (
                        cardToShow.map((r) => (
                            <div
                                key={r._id}
                                style={{
                                    backgroundImage: `url('${
                                        r.poster ||
                                        "https://i.ibb.co/VQ6VhT4/icon.jpg"
                                    }')`,
                                }}
                                className="card justify-end bg-cover bg-center rounded-xl hover:drop-shadow-[0_0_5px_#0a0] drop-shadow-[0_0_3px_#3eacff] hover:scale-105 h-[480px] lg:w-[300px] w-[250px]"
                            >
                                <div className="rounded-b-xl">
                                    <div className="card-body lg:mt-[270px] mt-[175px] backdrop-blur-sm rounded-b-xl text-white bg-black/35">
                                        <h2 className="card-title drop-shadow-[0_0_5px_#000]">
                                            {r.title}
                                        </h2>
                                        <p className="drop-shadow-[0_0_5px_#000]">
                                            Publishing Year: {r.publishingYear}
                                        </p>
                                        <p className="drop-shadow-[0_0_5px_#000]">
                                            Genres: {r.genres}
                                        </p>
                                        <div className="card-actions justify-end">
                                            <button
                                                onClick={() =>
                                                    handleExplore(r._id)
                                                }
                                                className="btn btn-accent"
                                            >
                                                Explore Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-600 bg-red-100 border mx-auto border-red-300 px-4 py-2 w-full text-center container rounded-md">
                            No one Reviewed any Games yet!
                        </p>
                    )}
                </div>
                {filteredData.length > initialVisibleCards && (
                    <div className="text-center my-4">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="btn btn-success rounded-lg transition"
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )}
            </Fade>
        </div>
    );
};

export default AllReviews;
