import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";

const MainLayout = () => {
    const { themeToggle } = useAuth();
    return (
        <div data-theme={themeToggle ? "light" : "dark"}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
