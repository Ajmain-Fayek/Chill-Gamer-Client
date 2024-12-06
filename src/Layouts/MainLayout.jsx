import { useContext } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const MainLayout = () => {
    const { themeToggle } = useContext(AuthContext);
    return (
        <div data-theme={themeToggle ? "light" : "dark"}>
            <Navbar/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
