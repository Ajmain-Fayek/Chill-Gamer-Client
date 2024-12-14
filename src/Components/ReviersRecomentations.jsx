import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const ReviersRecomentations = ({
    prop = "Best Game Review Application ever!!!",
}) => {
    const { themeToggle } = useContext(AuthContext);
    return (
        <div>
            <div
                className={`max-w-[350px] w-full rounded-2xl  p-6 shadow-lg md:p-8 drop-shadow-md hover:scale-105 ${
                    themeToggle
                        ? "bg-gray-300 text-slate-700"
                        : "bg-[#18181B] text-white/80"
                }`}
            >
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="w-[100px] h-[100px] rounded-full">
                        <img
                            className="w-[100px] h-[100px] object-cover object-center rounded-full"
                            src="https://i.ibb.co.com/4jMYh4D/asset14.jpg"
                        />
                    </div>
                    <h6 className="text-center font-medium">{prop}</h6>
                    <p className="text-center">Incognito733</p>
                </div>
            </div>
        </div>
    );
};

export default ReviersRecomentations;
