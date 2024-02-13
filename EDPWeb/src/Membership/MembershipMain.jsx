import { useEffect, useState } from "react";
import { TiTickOutline, TiTimesOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import http from "../../http";  

function MembershipMain() {
    const navigate = useNavigate();
    const [ currentMembership, setCurrentMembership ] = useState("");

    useEffect(() => {
        http.get("/membership/getMembership", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setCurrentMembership(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [])

    return (
        <div className="bg-gradient-to-br from-blue-950 to-red-700">
            <div className="bg-gradient-to-br px-12 py-10 w-screen from-orange-400 to-red-400">
                <h1 className="text-3xl font-bold">Membership</h1>
                <p className="text-lg">
                    Join us today as a member of{" "}
                    <span className="text-xl font-bold">UPLAY</span>
                </p>
            </div>

            <div className="grid grid-cols-3 grid-rows-1 space-x-5 my-6 mx-10">
                <div className="my-5 p-10 space-y-6 bg-gray-300/30 text-gray-100 rounded-lg">
                    <h1 className="text-3xl">
                        Standard <br />
                        <span className="text-lg font-medium">Free!</span>
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
                    {currentMembership.membershipStatus == "Standard" && (
                        <div className="text-center">
                            <p className="text-xl font-medium my-auto">
                                Current Plan
                            </p>
                        </div>
                    )}
                </div>

                <div className="my-5 p-10 space-y-6 bg-sky-300/30 text-gray-100 rounded-lg">
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
                    {currentMembership.membershipStatus == "FriendsOfUPlay" && (
                        <div className="text-center">
                            <p className="text-xl font-medium my-auto">
                                Current Plan
                            </p>
                        </div>
                    )}
                    {currentMembership.membershipStatus != "FriendsOfUPlay" && (
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
                    )}
                </div>

                <div className="my-5 p-10 space-y-6 bg-amber-200/30 text-gray-100 rounded-lg">
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
                    {currentMembership.membershipStatus == "NTUCMember" && (
                        <div className="text-center">
                            <p className="text-xl font-medium py-4">
                                Current Plan
                            </p>
                        </div>
                    )}
                    {currentMembership.membershipStatus != "NTUCMember" && (
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default MembershipMain;
