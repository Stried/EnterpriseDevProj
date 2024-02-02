import { useContext, useEffect, useState } from "react";
import UserContext from "../Users/UserContext";
import AdminAllUsers from "./AdminAllUsers";
import { Link } from "react-router-dom";

function AdminPanel() {
    const { user } = useContext(UserContext);
    const [ currentOption, setCurrentOption ] = useState("optionOne");

    useEffect(() => {

    }, [])

    return (
        <div className="m-5">
            <div className="py-5">
                <h1 className="text-center text-3xl font-semibold">
                    Admin Panel
                </h1>
                <p className="text-center text-xl font-medium">
                    Welcome back, Username
                </p>
            </div>
            <div className="flex py-10 px-4 min-h-[100vh] max-h-full bg-gradient-to-b from-orange-300 to-red-400 rounded-xl">
                <div className="w-1/3 flex flex-col space-y-3 px-4 mx-3 py-5 bg-white rounded-md drop-shadow-lg">
                    <h2 className="px-3 text-2xl font-semibold">Menu</h2>
                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionOne" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionOne")}
                    >
                        <button className="text-lg font-medium">
                            User Accounts
                        </button>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionTwo" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionTwo")}
                    >
                        <button className="text-lg font-medium">
                            Groups List
                        </button>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionThree" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionThree")}
                    >
                        <button className="text-lg font-medium">
                            Support Ticket
                        </button>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionFour" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionFour")}
                    >
                        <button className="text-lg font-medium">
                            Merchant Request
                        </button>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionFive" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionFive")}
                    >
                        <Link to="/eventrecords">
                        <button className="text-lg font-medium">
                            Event Records
                        </button>
                        </Link>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionSix" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionSix")}
                    >
                        <Link t0="/eventapplications">
                        <button className="text-lg font-medium">
                            Event Applications
                        </button>
                        </Link>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionSeven" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionSeven")}
                    >
                        <button className="text-lg font-medium">
                            Voucher Records
                        </button>
                    </div>

                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionEight" ? `bg-red-400` : ``)
                        }
                        onClick={() => setCurrentOption("optionEight")}
                    >
                        <button className="text-lg font-medium">
                            Data Analytics
                        </button>
                    </div>
                </div>
                <div className="mx-5 px-2 w-5/6 bg-white rounded-md">
                    <AdminAllUsers />
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;