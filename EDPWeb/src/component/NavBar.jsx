import { Link } from "react-router-dom";

import LogoUPlay from "./../assets/logo_uplay.png";

function NavBar() {
    return (
        <div className="flex px-4 py-5 text-3xl w-screen z-50 bg-transparent justify-between">
            <div
                // className="w-1/4"
                id="logoArea"
            >
                <Link
                    to={"/"}
                    className="text-4xl tracking-wide px-10 font-black font-mono text-white hover:bg-gradient-to-br from-orange-400 to-red-500 hover:text-transparent bg-clip-text transition-all duration-300 ease-in-out"
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
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    EVENTS
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    PLUG & PLAY
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    MEMBERSHIP
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    LOGIN
                </Link>
            </div>
        </div>
    );
}

export default NavBar;