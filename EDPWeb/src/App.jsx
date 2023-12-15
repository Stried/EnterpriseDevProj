import { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar";
import { AiOutlineMenu } from "react-icons/ai";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Footer } from "flowbite-react";
import http from "./../http"

import backgroundMain1 from "./../src/assets/backgroundMain1.jpg";
import MainPage from "./component/MainPage";
import Register from "./Users/Register";
import Login from "./Users/Login";
import UserContext from "./Users/UserContext";
import UserAccount from "./Users/UserAccount";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ menuClicks, setMenuClicks ] = useState(0);
    const [ navbarVis, setNavbarVis ] = useState(null);
    const [ user, setUser ] = useState(null);

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
    }, [ location.pathname, navbarVis ])

    useEffect(() => {
        console.log(user);
    })
    
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`, // This is needed for mine for some reason, not part of the practical
                },
            })
                .then((res) => {
                    setUser(res.data)
                    console.log(user);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
                        <Route path="/account" element={<UserAccount />} />
                    </Routes>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
