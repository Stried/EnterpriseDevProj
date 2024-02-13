import { TiTickOutline, TiTimesOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function MembershipMain() {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="bg-gradient-to-br px-12 py-10 w-screen from-orange-400 to-red-400">
                <h1 className="text-3xl font-bold">Membership</h1>
                <p className="text-lg">
                    Join us today as a member of{" "}
                    <span className="text-xl font-bold">UPLAY</span>
                </p>
            </div>

            <div className="grid grid-cols-3 grid-rows-1 space-x-5 my-6 mx-10">
                <div className="my-5 p-10 space-y-6 bg-gray-200">
                    <h1 className="text-3xl">
                        Standard <br />
                        <span className="text-lg font-medium">
                            ($FREE / month)
                        </span>
                    </h1>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Book events</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Add groups and friends</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Use vouchers to book events
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Participate in giveaways and more!
                        </span>
                    </div>
                    <div className="flex">
                        <TiTimesOutline className="text-2xl text-red-400" />{" "}
                        <span className="my-auto">Cheaper Event Prices</span>
                    </div>
                    <div className="flex">
                        <TiTimesOutline className="text-2xl text-red-400" />{" "}
                        <span className="my-auto">
                            Birthday Month Discounts
                        </span>
                    </div>
                    <div className="flex">
                        <TiTimesOutline className="text-2xl text-red-400" />{" "}
                        <span className="my-auto">
                            Unique Vouchers for Members
                        </span>
                    </div>
                    <div className="text-center">
                        <button className="text-xl font-medium text-gray-100 bg-orange-400 rounded px-3 py-2">
                            Get Now
                        </button>
                    </div>
                </div>

                <div className="my-5 p-10 space-y-6 bg-gray-200">
                    <h1 className="text-3xl">
                        Friends of UPLAY <br />
                        <span className="text-lg font-medium">
                            ($9.99 / month)
                        </span>
                    </h1>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Book events</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Add groups and friends</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Use vouchers to book events
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Participate in giveaways and more!
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Cheaper Event Prices</span>
                    </div>
                    <div className="flex">
                        <TiTimesOutline className="text-2xl text-red-400" />{" "}
                        <span className="my-auto">
                            Birthday Month Discounts
                        </span>
                    </div>
                    <div className="flex">
                        <TiTimesOutline className="text-2xl text-red-400" />{" "}
                        <span className="my-auto">
                            Unique Vouchers for Members
                        </span>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() =>
                                navigate("/membership/FriendsOfUPlay")
                            }
                            className="text-xl font-medium text-gray-100 bg-orange-400 rounded px-3 py-2"
                        >
                            Get Now
                        </button>
                    </div>
                </div>

                <div className="my-5 p-10 space-y-6 bg-gray-200">
                    <h1 className="text-3xl">
                        NTUC Member <br />
                        <span className="text-lg  font-medium">
                            ($14.99 / month)
                        </span>
                    </h1>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Book events</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Add groups and friends</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Use vouchers to book events
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Participate in giveaways and more!
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">Cheaper Event Prices</span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Birthday Month Discounts
                        </span>
                    </div>
                    <div className="flex">
                        <TiTickOutline className="text-2xl text-green-400" />{" "}
                        <span className="my-auto">
                            Unique Vouchers for Members
                        </span>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() =>
                                navigate("/membership/NTUCMember")
                            }
                            className="text-xl font-medium text-gray-100 bg-orange-400 rounded px-3 py-2"
                        >
                            Get Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipMain;
