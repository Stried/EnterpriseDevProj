import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import LogoUPlay from "./../assets/logo_uplay.png";
import UserContext from "../Users/UserContext";
import http from "./../../http"

function NavBarMainpage() {
    const { user } = useContext(UserContext);
    const [ googleUser, setGoogleUser ] = useState("");

    useEffect(() => {
        if (localStorage.getItem("googleAccessToken")) {
            http.get("/user/googleAuth", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "googleAccessToken"
                    )}`,      
                },
            })
                .then((res) => {
                    setGoogleUser(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }, []);

    return (
        <div
            className={
                "flex px-4 py-5 text-3xl w-screen z-50 bg-transparent justify-between"
            }
        >
            <div
                // className="w-1/4"
                id="logoArea"
            >
                <Link
                    to={"/"}
                    className="text-4xl tracking-wide px-10 font-black font-sans text-white hover:bg-gradient-to-br from-orange-400 to-red-500 hover:text-transparent bg-clip-text transition-all duration-300 ease-in-out"
                >
                    {/* <img
                        src={LogoUPlay}
                        alt="UPlay Logo"
                        className="w-1/2"
                    /> */}
                    UPLAY
                </Link>
            </div>
            <div className="flex px-5 space-x-5 text-lg font-[450] my-auto tracking-tight text-white">
                {user && user.userRole == "Administrator" && (
                    <Link
                        to={"/adminPanel"}
                        className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                    >
                        ADMIN
                    </Link>
                )}
                <Link
                    to={"/eventoverviewuser"}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    EVENTS
                </Link>
                <Link
                    to={"/vouchers"}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    VOUCHERS
                </Link>
                <Link
                    to={`/membership`} // Don't touch this unless it's a security issue
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    MEMBERSHIP
                </Link>
                <Link
                    to={`/myCart`} // Don't touch this unless it's a security issue
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    CART
                </Link>
                {!user && !googleUser && (
                    <Link
                        to={"/login"}
                        className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                    >
                        LOGIN
                    </Link>
                )}
                {user && <Link to={"/account"}>{user.name}</Link>}
                {googleUser && <Link to={"/account"}>{googleUser.name}</Link>}
            </div>
        </div>
    );
}

export default NavBarMainpage;
