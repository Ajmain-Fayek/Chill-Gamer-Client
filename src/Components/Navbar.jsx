import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
// import { fadeIn, fadeOut } from "react-animations";
import "animate.css";

const Navbar = () => {
    const { themeToggle, setThemeToggle, user, logOutUser } =
        useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div
            style={{
                backgroundImage: "url('https://i.ibb.co.com/KhbGxtm/bg2.jpg')",
            }}
            className="flex items-center bg-cover bg-center w-full sticky top-0 z-[9999]"
        >
            <div
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/R9T1YNQ/bg1.jpg')",
                }}
                className="w-1/2 lg:w-1/4 lg:flex hidden -ml-4 bg-cover bg-center h-[100px] skew-x-12"
            >
                <Link
                    to={"/"}
                    className="flex -skew-x-12 justify-end w-full mr-5 items-center gap-2"
                >
                    <img
                        className="xl:h-[80px] lg:h-[65px]"
                        src="https://i.ibb.co.com/Gn3kvJw/favicon.png"
                        alt="Chill Gamer Logo"
                    />
                    <h1 className="text-4xl lg:text-xl xl:text-2xl text-sky-100 font-semibold drop-shadow-[0_0_5px_#00ff00]">
                        Chill Gamer
                    </h1>
                </Link>
            </div>
            <div className="lg:w-2/4 w-2/3 -ml-4 lg:-ml-1 bg-green-600 h-[100px] skew-x-12 flex items-center">
                <Link
                    to={"/"}
                    className="flex -skew-x-12 justify-start w-full lg:hidden mr-5 items-center ml-5 gap-2"
                >
                    <img
                        className="md:h-[70px] h-[60px]"
                        src="https://i.ibb.co.com/Gn3kvJw/favicon.png"
                        alt="Chill Gamer Logo"
                    />
                    <h1 className="text-gl md:text-xl text-sky-100 font-semibold drop-shadow-[0_0_5px_#00ff00]">
                        Chill Gamer
                    </h1>
                </Link>
                <div className="hidden lg:flex items-center w-full text-white font-semibold -skew-x-12">
                    <nav className="flex items-center gap-3 justify-evenly w-full">
                        <NavLink to={"/"}>Home</NavLink>

                        <NavLink to={"/all-reviews"}>All Reviews</NavLink>

                        <NavLink to={"/add-reviews"}>Add Review</NavLink>

                        <NavLink to={"/my-reviews"}>My Reviews</NavLink>

                        <NavLink to={"/my-watchlist"}>My Watchlist</NavLink>
                    </nav>
                </div>
            </div>
            <div className=" w-1/2 lg:w-1/4 flex items-center justify-end lg:justify-center gap-10 mr-2">
                <div className="hidden lg:block">
                    {themeToggle ? (
                        <button
                            onClick={() => setThemeToggle(!themeToggle)}
                            className="drop-shadow-[0_0_5px_#00aa00]"
                        >
                            <MdDarkMode size={"1.5rem"} color="#fff" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setThemeToggle(!themeToggle)}
                            className="drop-shadow-[0_0_5px_#00aa00]"
                        >
                            <MdOutlineLightMode size={"1.5rem"} color="#fff" />
                        </button>
                    )}
                </div>
                <Link to={"/profile"} className="hidden lg:block">
                    <div className="dropdown dropdown-bottom dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-circle w-14 btn-lg bg-transparent border-none hover:bg-green-800"
                        >
                            <img
                                className="h-14 w-14 object-cover object-center rounded-full border border-green-500 drop-shadow-[0_0_6px_#00aa00]"
                                src={
                                    user && user.photoUrl
                                        ? user.photoUrl
                                        : "https://i.ibb.co.com/NjcKdp9/asset5.jpg"
                                }
                            />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow dark:border"
                        >
                            <p className="mx-auto mb-2 font-semibold text-xl">
                                User Name
                            </p>
                            <li>
                                <div
                                    onClick={() => navigate("/profile")}
                                    className="w-full block text-center text-lg"
                                >
                                    Profile
                                </div>
                            </li>
                        </ul>
                    </div>
                </Link>
                {user ? (
                    <button
                        onClick={() => logOutUser()}
                        className="hidden lg:block drop-shadow-[0_0_6px_#00aa00]"
                    >
                        <RiLogoutBoxLine color="fff" fontSize={"2rem"} />
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')} className="hidden lg:block drop-shadow-[0_0_6px_#00aa00]">
                        <RiLoginBoxLine color="#fff" fontSize={"2rem"} />
                    </button>
                )}
                <div className="dropdown dropdown-end lg:hidden">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="rounded-full w-14">
                            <img
                                className="h-14 w-14 object-cover object-center rounded-full border border-green-500 drop-shadow-[0_0_6px_#00aa00]"
                                src={
                                    user && user.photoUrl
                                        ? user.photoUrl
                                        : "https://i.ibb.co.com/NjcKdp9/asset5.jpg"
                                }
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:border"
                    >
                        <li>
                            <NavLink
                                to={"/profile"}
                                className="justify-between"
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/my-watchlist"}>My Watchlist</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/my-reviews"}>My Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/all-reviews"}>All Reviews</NavLink>
                        </li>
                        <li>
                            {user ? (
                                <NavLink onClick={() => logOutUser()}>Logout</NavLink>
                            ) : (
                                <NavLink to={"/login"}>LogIn</NavLink>
                            )}
                        </li>
                        <li className="transition-all">
                            {themeToggle ? (
                                <button
                                    onClick={() => setThemeToggle(!themeToggle)}
                                >
                                    <MdDarkMode size={"1rem"} color="#000" />
                                    {"Enable Dark Mode"}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setThemeToggle(!themeToggle)}
                                >
                                    <MdOutlineLightMode
                                        size={"1rem"}
                                        color="#fff"
                                    />
                                    {"Enable Light Mode"}
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
