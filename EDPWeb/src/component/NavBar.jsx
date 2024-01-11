import { Link } from "react-router-dom";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import LogoUPlay from "./../assets/logo_uplay.png";

import UserContext from "../Users/UserContext";

function NavBar() {
    const { user } = useContext(UserContext);

    return (
        <div className="flex px-4 py-5 text-3xl w-screen z-50 justify-between bg-stone-100 shadow-lg">
            <div
                // className="w-1/4"
                id="logoArea"
            >
                <Link
                    to={"/"}
                    className="text-4xl tracking-wide px-10 font-black font-sans text-black hover:bg-gradient-to-br from-orange-400 to-red-500 hover:text-transparent bg-clip-text transition-all duration-300 ease-in-out"
                >
                    {/* <img
                        src={LogoUPlay}
                        alt="UPlay Logo"
                        className="w-1/2"
                    /> */}
                    UPLAY
                </Link>
            </div>
            <div className="flex px-5 space-x-5 text-lg font-[450] my-auto tracking-tight text-black">
                <Link
                    to={"/eventapply"}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    EVENTS
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    PLUG & PLAY
                </Link>
                <Link
                    to={"/vouchers"}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    VOUCHERS
                </Link>
                <Link
                    to={"/membership"}
                    className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    MEMBERSHIP
                </Link>
                { !user && (
                    <Link
                        to={"/login"}
                        className="transition-all duration-300 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                    >
                        LOGIN
                    </Link>
                ) }
                { user && (
                    <Link to={ "/account" }>
                        {user.name}
                    </Link>
                )}
            </div>
        </div>
    );
}

export default NavBar;