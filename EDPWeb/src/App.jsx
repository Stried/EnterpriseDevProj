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
import EventOverview from "./Events/EventOverviewUser";
import EventDetails from "./Events/EventDetails";
import EventUpdate from "./Events/EventRecordUpdate";

import GetCartItem from "./Carts&Order/Cart";
import Checkout from "./Carts&Order/Checkout";

import VoucherPage from "./Vouchers/VoucherPage";
import AddGroup from "./Groups/AddGroup";
import JoinGroup from "./Groups/JoinGroup";
import GroupMain from "./Groups/GroupMain";
import AdminPanel from "./Admin/AdminPanel";
import AdminEditUser from "./Admin/AdminEditUser";
import AddVoucher from "./Vouchers/AddVoucher";
import UpdateVoucher from "./Vouchers/UpdateVoucher";
import Custom404 from "./ErrorPages/Custom404";
import AddFriends from "./Friends/AddFriends";
import FriendRequest from "./Friends/FriendRequest";
import Stripe from "./Carts&Order/StripeMain";
import PurchaseComplete from "./Carts&Order/PurchaseComplete"
import TicketMain from "./Tickets/TicketMain";
import TicketSubmission from "./Tickets/TicketSubmission";
import ViewTicket from "./Tickets/ViewTicket";
import Receipt from "./Carts&Order/Receipt";
import Custom401 from "./ErrorPages/Custom401";
import MembershipPurchase from "./Membership/MembershipPurchase";

function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [menuClicks, setMenuClicks] = useState(0);
    const [navbarVis, setNavbarVis] = useState(null);
    const [user, setUser] = useState("");
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
            } else {
                setNavbarVis(false);
            }
        };

        handleLocationChange();
    }, [location.pathname, navbarVis]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then((res) => {
                    console.log(res.data);
                    setUser(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        } else if (localStorage.getItem("googleAccessToken")) {
            http.get("/user/googleAccount", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "googleAccessToken"
                    )}`,
                },
            })
                .then((res) => {
                    setUser(res.data);
                    console.log(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    const AdministratorProtected = ({ children }) => {
        if (user.userRole != "Administrator") {
            return <Custom401 />;
        }

        return children;
    }

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
                            path="/myCart"
                            element={<GetCartItem />}
                        />
                        <Route
                            path="/checkout"
                            element={<Checkout />}
                        />
                        <Route
                            path="/paymentForm"
                            element={<Stripe />}
                        />
                        <Route
                            path="/purchaseComplete"
                            element={<PurchaseComplete />}
                        />
                        <Route
                            path="/receipt/:id"
                            element={<Receipt />}
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
                            path="/eventoverviewuser/Details/:EventId"
                            element={<EventDetails />}
                        />
                        <Route
                            path="/eventRecordUpdate/UpdateEvent/:EventId"
                            element={<EventUpdate />}
                        />
                        <Route
                            path="/eventoverviewuser"
                            element={<EventOverview />}
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
                        <Route
                            path="/group/:grpId"
                            element={<GroupMain />}
                        />
                        <Route
                            path="/addFriends"
                            element={<AddFriends />}
                        />
                        <Route
                            path="/friendRequests"
                            element={<FriendRequest />}
                        />
                        <Route
                            path="/adminPanel"
                            element={
                                <AdministratorProtected>
                                    <AdminPanel />
                                </AdministratorProtected>
                            }
                        />
                        <Route
                            path="/adminPanel/editUser/:id"
                            element={
                                <AdministratorProtected>
                                    <AdminEditUser />
                                </AdministratorProtected>
                            }
                        />
                        <Route
                            path="/vouchers"
                            element={<VoucherPage />}
                        />
                        <Route
                            path="/vouchers/addVouchers"
                            element={<AddVoucher />}
                        />
                        <Route
                            path="/vouchers/updateVouchers/:voucherID"
                            element={<UpdateVoucher />}
                        />
                        <Route
                            path="/support"
                            element={<TicketMain />}
                        />
                        <Route
                            path="/support/submitTicket"
                            element={<TicketSubmission />}
                        />
                        <Route
                            path="/support/ticket/:ticketId"
                            element={<ViewTicket />}
                        />
                        <Route
                            path="/membership"
                            element={<MembershipMain />}
                        />
                        <Route
                            path="/membership/:membershipType"
                            element={<MembershipPurchase />}
                        />
                        <Route
                            path="/401"
                            element={<Custom401 />}
                        />
                        <Route
                            path="/404"
                            element={<Custom404 />}
                        />
                        <Route
                            path={"*"}
                            element={<Custom404 />}
                        />
                    </Routes>
                </div>

                <Footer container>
                    <Footer.Copyright
                        href="#"
                        by="UPLAY™"
                        year={2023}
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="#">About</Footer.Link>
                        <Footer.Link href="#">Privacy Policy</Footer.Link>
                        <Footer.Link href="#">Licensing</Footer.Link>
                        <Footer.Link href="#">Contact</Footer.Link>
                    </Footer.LinkGroup>
                </Footer>
            </div>
        </UserContext.Provider>
    );
}

export default App;
