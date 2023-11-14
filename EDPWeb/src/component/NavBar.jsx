import { Link } from "react-router-dom";

import LogoUPlay from "./../assets/logo_uplay.png";

function NavBar() {
    return (
        <div className="flex px-4 py-3 text-3xl w-screen justify-between z-50 bg-gray-200">
            <div
                className="w-1/4"
                id="logoArea"
            >
                <Link to={"/"}>
                    <img
                        src={LogoUPlay}
                        alt="UPlay Logo"
                        className="w-1/2"
                    />
                </Link>
            </div>
            <div className="flex space-x-5 text-lg font-[550] my-auto">
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    All Activities
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    Corporate Plug & Play
                </Link>
                <Link
                    to={""}
                    className="transition-all duration-500 ease-in-out bg-no-repeat bg-left-bottom bg-[length:0%_4px] bg-gradient-to-r from-orange-400 to-red-500 hover:bg-[length:100%_4px]"
                >
                    Friends of UPlay
                </Link>
            </div>
            <div className="w-1/4 flex space-x-4 text-lg my-auto px-3 justify-end">
                <Link className="">Login</Link>
                <Link className="" to={"/register"}>Sign Up</Link>
            </div>
        </div>
    );
}

export default NavBar;