import React from "react";
import Swal from "sweetalert2";

const NewsLater = () => {
    return (
        <div className="container mx-auto mb-10">
            <section
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/WpDn89G/asset6.jpg')",
                }}
                className="bg-center bg-cover"
            >
                <div className="py-8 px-4 mx-auto backdrop-blur-sm bg-black/50 lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md sm:text-center">
                        <h2 className="mb-4 text-3xl tracking-tight font-extrabold sm:text-4xl text-white">
                            Sign up for our newsletter
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl md:mb-12 sm:text-xl text-gray-200">
                            Stay up to date with the roadmap progress,
                            announcements and exclusive discounts feel free to
                            sign up with your email.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (e.target.email.value)
                                    Swal.fire({
                                        title: "Success",
                                        text: "Thanks You for Subscribing",
                                        icon: "success",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                            }}
                        >
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label className="hidden mb-2 text-sm font-medium text-gray-200">
                                        Email address
                                    </label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-200"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        className="block p-3 pl-10 w-full text-sm rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-700 placeholder-gray-400 text-white focus:ring-green-500 focus:border-green-500"
                                        placeholder="Enter your email"
                                        type="email"
                                        id="email"
                                        required=""
                                        name="email"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-left newsletter-form-footer text-gray-300">
                                We care about the protection of your data.{" "}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 text-primary-500 hover:underline"
                                >
                                    Read our Privacy Policy
                                </a>
                                .
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsLater;
