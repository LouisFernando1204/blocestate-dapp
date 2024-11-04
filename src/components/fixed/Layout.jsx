/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "../ui/loading-screen";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

const Layout = ({ handleConnect, principal }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    })

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <Navbar handleConnect={handleConnect} principal={principal} />
            <BackgroundBeamsWithCollision className="min-h-screen h-full w-full flex flex-col items-center justify-center font-poppins">
                <Outlet />
            </BackgroundBeamsWithCollision>
            <Footer />
        </>
    );
};

export default Layout;