import { useEffect, useState, useContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar";
import { AiOutlineMenu } from "react-icons/ai";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Footer } from "flowbite-react";
import http from "./../http";
import EventApply from "./Events/EventApplication";
import backgroundMain1 from "./../src/assets/backgroundMain1.jpg";
import MainPage from "./component/MainPage";
import Register from "./Users/Register";
import Login from "./Users/Login";
import UserContext from "./Users/UserContext";
import UserAccount from "./Users/UserAccount";
import EventApplications from "./Events/EventApplicationAdmin";
import MembershipMain from "./Membership/MembershipMain";
import EventApplicationDetailed from "./Events/EventApplicationDetailed";
import EventRecords from "./Events/EventRecords";
import GetCart from "./Carts&Order/Cart";

import VoucherPage from "./Vouchers/VoucherPage";
import AddGroup from "./Groups/AddGroup";
import JoinGroup from "./Groups/JoinGroup";
import GroupMain from "./Groups/GroupMain";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [menuClicks, setMenuClicks] = useState(0);
    const [navbarVis, setNavbarVis] = useState(null);
    const [ user, setUser ] = useState(null);
    const [themeSetting, setTheme] = useState("");

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
    }, [location.pathname, navbarVis]);

    useEffect(() => {
        console.log(user);
    });

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`, // This is needed for mine for some reason, not part of the practical
                    // - So then, is it really practical? Pratically practicalism? Practicalismality? Praticalismalitism? Malteser?
                },
            })
                .then((res) => {
                    setUser(res.data);
                    console.log(user);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    // useEffect(() => {
    //     http.get("/theme/1", {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //         },
    //     })
    //         .then((res) => {
    //             console.log(res.data);
    //             setTheme(res.data);
    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div
                className={`w-screen min-h-screen h-full bg-[${themeSetting.main}]`}
            >
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
                        <Route
                            path="/eventapply"
                            element={<EventApply />}
                        />
                        <Route
                            path="/eventapplications"
                            element={<EventApplications />}
                        />
                        <Route
                            path="/eventrecords"
                            element={<EventRecords />}
                        />
                        <Route
                            path="/membership"
                            element={<MembershipMain />}
                        />
                        <Route
                            path="/GetCartItem/:id"
                            element={< GetCart/>}
                        />
                        <Route
                            path="/GetCart/:id"
                            element={< GetCart/>}
                        />
                        <Route
                            path="/eventapplicationdetailed/Details/:EventId"
                            element={<EventApplicationDetailed />}
                        />
                        <Route
                            path="/eventapplicationdetailed/Approval/:EventId"
                            element={<EventApplicationDetailed />}
                        />
                        <Route
                            path="/account"
                            element={<UserAccount />}
                        />
                        <Route
                            path="/createGroup"
                            element={<AddGroup />}
                        />
                        <Route
                            path="/joinGroup"
                            element={<JoinGroup />}
                        />
                        <Route path="/group/:grpId" element={<GroupMain />} />
                        <Route
                            path="/vouchers"
                            element={<VoucherPage />}
                        />

                    </Routes>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
