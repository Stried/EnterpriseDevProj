import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar";
import { AiOutlineMenu } from "react-icons/ai";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Footer } from "flowbite-react";

import backgroundMain1 from "./../src/assets/backgroundMain1.jpg";
import MainPage from "./component/MainPage";
import Register from "./Users/Register";
import Login from "./Users/Login";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ menuClicks, setMenuClicks ] = useState(0);
    const [ navbarVis, setNavbarVis ] = useState(null);

    const handleMouseMove = (e) => {
        setTimeout(() => {
            setPosition({ x: e.pageX, y: e.pageY });
        }, 100);
    };

    const location = useLocation();

    useEffect(() => {
        const handleLocationChange = () => {
            if (window.location.pathname === "/") {
                setNavbarVis(true);
                console.log("Changed True " + navbarVis);
            } else {
                setNavbarVis(false);
                console.log("Changed False " + navbarVis);
            }
        };

        handleLocationChange();
    }, [location.pathname, navbarVis])

    return (
        <div className="w-screen min-h-screen h-full">
            {navbarVis === false && <NavBar />}
            <div className="">
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage />}
                    />
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                </Routes>
            </div>
            <Footer container>
                <div className="w-full text-center">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                        <Footer.Brand
                            href="/"
                            src=".\src\assets\logo_uplay.png"
                            alt="UPLAY Logo"
                        />
                        <Footer.LinkGroup>
                            <Footer.Link href="#">About</Footer.Link>
                            <Footer.Link href="#">Privacy Policy</Footer.Link>
                            <Footer.Link href="#">Licensing</Footer.Link>
                            <Footer.Link href="#">Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <Footer.Divider />
                    <Footer.Copyright
                        href="#"
                        by="UPlay™"
                        year={2023}
                    />
                </div>
            </Footer>
        </div>
    );
}

export default App;
