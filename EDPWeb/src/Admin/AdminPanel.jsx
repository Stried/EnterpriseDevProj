import { useContext, useEffect, useState } from "react";
import UserContext from "../Users/UserContext";
import AdminAllUsers from "./AdminAllUsers";
import { Link } from "react-router-dom";
import AdminAllTickets from "./AdminAllTickets";

function AdminPanel() {
    const { user } = useContext(UserContext);
    const [ currentOption, setCurrentOption ] = useState("optionOne");

    useEffect(() => {

    }, [])

    return (
        <div className="bg-gradient-to-br from-blue-950 to-red-700 p-5">
            <div className="py-5 text-gray-100">
                <h1 className="text-center text-3xl font-semibold">
                    Admin Panel
                </h1>
                <p className="text-center text-xl font-medium">
                    Welcome back, {user.name}
                </p>
            </div>
            <div className="flex py-5 px-4 min-h-[100vh] max-h-full rounded-xl">
                <div className="w-1/3 flex flex-col space-y-3 px-4 mx-3 py-5 bg-white/30 text-gray-100 rounded-md drop-shadow-lg">
                    <h2 className="px-3 text-2xl font-semibold">Menu</h2>
                    <div
                        className={
                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                            (currentOption == "optionOne" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionTwo" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionThree" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionFour" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionFive" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionSix" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionSeven" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
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
                            (currentOption == "optionEight" ? `bg-gradient-to-r from-red-400/70 to-transparent` : ``)
                        }
                        onClick={() => setCurrentOption("optionEight")}
                    >
                        <button className="text-lg font-medium">
                            Data Analytics
                        </button>
                    </div>
                </div>
                <div className="px-2 w-5/6 bg-white/30 rounded-md">
                    {currentOption == "optionOne" && <AdminAllUsers />}
                    {currentOption == "optionTwo" && <AdminAllUsers />}
                    {currentOption == "optionThree" && <AdminAllTickets />}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;