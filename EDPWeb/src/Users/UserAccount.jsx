import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { Spinner, Card, Avatar, theme } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import http from "./../../http";

import { Badge } from "flowbite-react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaPen, FaRegUser } from "react-icons/fa";

import UserSettings from "./UserSettings";


function UserAccount() {
    const [ user, setUser ] = useState("");
    const [ membershipStatus, setMembershipStaus ] = useState("");
    const [currentOption, setCurrentOption] = useState("optionOne");
    const [groupsList, setGroupsList] = useState([]);
    const [groupsLengthList, setGroupsLengthList] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [supportTicketList, setSupportTicketList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/group/getUserGroups", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then((res) => {
                    setGroupsList(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }, [])

    const navigate = useNavigate();

    const logout = () => {
        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("accessToken");
            navigate("/");
            window.location.reload();
        }
    }

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
                })
        }
    }, []);

    const getUserLength = (groupID) => {
        http.get(`/group/groupDetails/${groupID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                // creates a list to store the lengths of all the grps in the list
                var listLength = res.data.length;
                groupsLengthList.push(listLength);
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    useEffect(() => {
        groupsList.map((groups, i) => {
            getUserLength(groups.id);
        })
    }, [groupsList])

    useEffect(() => {
        http.get("/friends/getApprovedFriends", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setFriendsList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    })

    const removeFriend = (id) => {
        http.delete(`/friends/approveDelete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        http.get("/ticket/getAllUserTickets", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setSupportTicketList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [])

    const openTicket = (id) => {
        navigate(`/support/ticket/${id}`);
    }

    useEffect(() => {
        http.get("/order/GetMyOrders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setOrderList(res.data)
                console.log(orderList)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [ supportTicketList ]);
    
    useEffect(() => {
        http.get("/membership/getMembership", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setMembershipStaus(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [])

    return (
        <div className="">
            {user && (
                <div
                    className={`min-h-[100vh] max-h-full bg-gradient-to-br from-gray-800 to-red-700 text-gray-100`}
                >
                    {user && (
                        <div
                            className={`p-5 flex space-x-6 backdrop-brightness-90 min-h-[100vh] text-black`}
                        >
                            <div className="w-1/3">
                                <div
                                    className={`flex text-gray-100 bg-white/30 p-5 rounded-lg shadow-md`}
                                    id="userProfile"
                                >
                                    <div className="w-1/3">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className="pt-1"
                                            img={user.imageFile}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <h1 className="text-3xl font-medium truncate">
                                            {user.name}
                                        </h1>
                                        <p className="flex">
                                            {" "}
                                            <MdEmail className="my-auto mr-1" />{" "}
                                            {user.email}
                                        </p>
                                        <p className="flex">
                                            {" "}
                                            <MdPhone className="my-auto mr-1" />{" "}
                                            {user.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                                <nav
                                    className={`flex flex-col space-y-3 mt-5 bg-white/30 text-gray-100 p-5 rounded-lg shadow-md`}
                                    id="optionsMenu"
                                >
                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionOne"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionOne")
                                        }
                                    >
                                        <button>My Account</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionThree"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionThree")
                                        }
                                    >
                                        <button>Groups</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionFour"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionFour")
                                        }
                                    >
                                        <button>Friends</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionFive"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionFive")
                                        }
                                    >
                                        <button>Support Ticket</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionSix"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionSix")
                                        }
                                    >
                                        <button>Transaction History </button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionSeven"
                                                ? `bg-gradient-to-r from-red-400/70 to-transparent`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionSeven")
                                        }
                                    >
                                        <button>Settings</button>
                                    </div>
                                </nav>
                            </div>
                            <div
                                className={`w-2/3 p-10 bg-white/30 text-gray-100 rounded-lg`}
                            >
                                {currentOption == "optionOne" && (
                                    <div className="">
                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                FULL NAME{" "}
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.name}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                NRIC{" "}
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.nric}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                EMAIL ADDRESS{" "}
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.email}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                PHONE NUMBER{" "}
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.phoneNumber}
                                            </h2>
                                        </div>
                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                MEMBERSHIP STATUS{" "}
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {membershipStatus.membershipStatus ==
                                                    "NTUCMember" && (
                                                    <p>NTUC Member</p>
                                                )}
                                                {membershipStatus.membershipStatus ==
                                                    "FriendsOfUPlay" && (
                                                    <p>Friends Of UPlay</p>
                                                )}
                                                {membershipStatus.membershipStatus ==
                                                    "Standard" && (
                                                    <p>Standard</p>
                                                )}
                                            </h2>
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionThree" && (
                                    <div className="">
                                        <h1 className="text-3xl font-light">
                                            Groups
                                        </h1>
                                        <p className="flex space-x-3">
                                            <Link
                                                to={"/createGroup"}
                                                className="text-blue-400 visited:text-purple-500 underline"
                                            >
                                                Create Group
                                            </Link>
                                            <Link
                                                to={"/joinGroup"}
                                                className="text-blue-400 visited:text-purple-500 underline"
                                            >
                                                Join Group
                                            </Link>
                                        </p>
                                        <div className="my-5 grid grid-cols-3 text-black">
                                            {groupsLengthList &&
                                            groupsList.length != 0 ? (
                                                groupsList.map((groups, i) => {
                                                    return (
                                                        <div className="bg-gray-200 px-4 py-5 rounded-md shadow-lg mr-4 mb-4">
                                                            <h1 className="text-xl font-semibold">
                                                                {
                                                                    groups.groupName
                                                                }
                                                            </h1>
                                                            <p className="flex justify-between mt-4">
                                                                <div className="flex">
                                                                    <FaRegUser className="my-auto" />{" "}
                                                                    <span className="mx-2">
                                                                        {
                                                                            groupsLengthList[
                                                                                i
                                                                            ]
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex-end">
                                                                    <Link
                                                                        to={`/group/${groups.id}`}
                                                                        className="px-3 py-2 bg-orange-400 rounded-md"
                                                                    >
                                                                        View
                                                                    </Link>
                                                                </div>
                                                            </p>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="text-gray-100">
                                                    <p className="mb-5">
                                                        You are currently not
                                                        part of any groups.
                                                    </p>
                                                    <p className="">
                                                        Want to create a group?{" "}
                                                        <a
                                                            href="/createGroup"
                                                            className="text-blue-500 visited:text-purple-500 font-medium"
                                                        >
                                                            Click here
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Join a group?{" "}
                                                        <a
                                                            href="/joinGroup"
                                                            className="text-blue-500 visited:text-purple-500 font-medium"
                                                        >
                                                            Find One Today
                                                        </a>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionFour" && (
                                    <div className="">
                                        <div className="">
                                            <h1 className="text-3xl font-light">
                                                Friends
                                            </h1>
                                            <p className="flex space-x-3 underline">
                                                <Link
                                                    to={"/addFriends"}
                                                    className="text-blue-500 visited:text-purple-400"
                                                >
                                                    Add A Friend
                                                </Link>

                                                <Link
                                                    to={"/friendRequests"}
                                                    className="text-blue-500 visited:text-purple-400"
                                                >
                                                    Friend Request(s)
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="text-black">
                                            {friendsList == 0 ? (
                                                <div className="text-gray-100">
                                                    <p className="mb-5">
                                                        You are currently have
                                                        no friends.
                                                    </p>
                                                    <p className="">
                                                        Want to add a friend?{" "}
                                                        <a
                                                            href="/addFriends"
                                                            className="text-blue-500 visited:text-purple-500 font-medium"
                                                        >
                                                            Click here
                                                        </a>
                                                    </p>
                                                    <p>
                                                        View Friend Request?{" "}
                                                        <a
                                                            href="/friendRequests"
                                                            className="text-blue-500 visited:text-purple-500 font-medium"
                                                        >
                                                            Approve Here
                                                        </a>
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="my-5 grid grid-cols-3">
                                                    {friendsList &&
                                                        friendsList.map(
                                                            (user, i) => {
                                                                return (
                                                                    <div className="mb-2 mr-2 bg-slate-200 px-3 py-4 rounded">
                                                                        <Avatar
                                                                            rounded
                                                                            size={
                                                                                "lg"
                                                                            }
                                                                            className=""
                                                                            img={
                                                                                user.imageFile
                                                                            }
                                                                        />
                                                                        <h1 className="text-center py-1 font-semibold">
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </h1>
                                                                        <p className="text-center">
                                                                            {
                                                                                user.email
                                                                            }
                                                                        </p>

                                                                        <div className="mx-auto text-center py-2 mt-2">
                                                                            <button
                                                                                onClick={() =>
                                                                                    removeFriend(
                                                                                        user.id
                                                                                    )
                                                                                }
                                                                                className="bg-red-400 px-3 py-2 rounded-md"
                                                                            >
                                                                                Unfriend
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionFive" && (
                                    <div className="">
                                        <div className="">
                                            <h1 className="text-3xl font-light">
                                                Support Tickets
                                            </h1>
                                            <p className="flex space-x-3 underline">
                                                <Link
                                                    to={"/support/submitTicket"}
                                                    className="text-blue-500 visited:text-purple-400"
                                                >
                                                    Submit A Ticket
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="">
                                            {supportTicketList.length == 0 && (
                                                <p>
                                                    You currently have no
                                                    support tickets
                                                </p>
                                            )}
                                            {supportTicketList &&
                                                supportTicketList.map(
                                                    (tickets, i) => {
                                                        return (
                                                            <div
                                                                onClick={() => {
                                                                    openTicket(
                                                                        tickets.id
                                                                    );
                                                                }}
                                                                className="bg-white text-black first-line: px-6 py-4 rounded-md flex mt-2 cursor-pointer"
                                                            >
                                                                <div className="grow">
                                                                    <h1 className="text-xl font-semibold">
                                                                        {
                                                                            tickets.ticketHeader
                                                                        }
                                                                    </h1>
                                                                    <p>
                                                                        Category:{" "}
                                                                        {
                                                                            tickets.ticketCategory
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm mt-5">
                                                                        Ticket
                                                                        No.{" "}
                                                                        {
                                                                            tickets.id
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="">
                                                                    {tickets.ticketStatus.toLowerCase() ==
                                                                        "open" && (
                                                                        <Badge
                                                                            color="indigo"
                                                                            className="w-fit text-sm my-auto mx-2"
                                                                        >
                                                                            Open
                                                                        </Badge>
                                                                    )}
                                                                    {tickets.ticketStatus.toLowerCase() ==
                                                                        "closed" && (
                                                                        <Badge
                                                                            color="failure"
                                                                            className="w-fit text-sm my-auto mx-2"
                                                                        >
                                                                            Closed
                                                                        </Badge>
                                                                    )}
                                                                    {tickets.ticketStatus.toLowerCase() ==
                                                                        "pending" && (
                                                                        <Badge
                                                                            color="warning"
                                                                            className="w-fit text-sm my-auto mx-2"
                                                                        >
                                                                            Pending
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionSix" && (
                                    <div className="">
                                        <div className="">
                                            <h1 className="text-3xl font-light">
                                                Transaction History
                                            </h1>
                                            {orderList.length == 0 && (
                                                <p>
                                                    You have not purchase
                                                    anything
                                                </p>
                                            )}
                                            {orderList && (
                                                <div className="bg-gray-100 text-black mt-3 rounded-md pt-2 pl-2 pr-2 drop-shadow-lg">
                                                    <div className="flex flex-col-3 font-semibold justify-between pr-2 border-b-2 border-zinc-200 pb-2">
                                                        <div className="pl-1">
                                                            Receipt Id
                                                        </div>
                                                        <div className="pr-12 pl-3">
                                                            Time of Purchase
                                                        </div>
                                                        <div className="pr-40"></div>
                                                    </div>
                                                    {orderList.map(
                                                        (order, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {i !=
                                                                        orderList.length -
                                                                            1 && (
                                                                        <div className="bg-gray-100 font-light text-black content-center my-3 flex flex-col-3 justify-between py-2 pl-6 pr-2 justify-items-center border-b-2 border-zinc-200 pb-2">
                                                                            <div className="flex pl-2">
                                                                                {
                                                                                    order.orderId
                                                                                }
                                                                            </div>
                                                                            <div className="flex">
                                                                                {new Date(
                                                                                    order.createdAt
                                                                                ).toLocaleString(
                                                                                    "en-US"
                                                                                )}
                                                                            </div>
                                                                            <button className="bg-red-400 p-1 rounded-md mb-2 -mt-1 px-3 hover:bg-red-600 transition duration-300">
                                                                                <Link
                                                                                    to={`/receipt/${order.orderId}`}
                                                                                >
                                                                                    Click
                                                                                    to
                                                                                    view
                                                                                    receipt
                                                                                </Link>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {i ==
                                                                        orderList.length -
                                                                            1 && (
                                                                        <div className="bg-gray-100 text-black content-center my-3 flex flex-col-3 justify-between py-2 pl-6 pr-2 justify-items-center border-b-2 border-zinc-200 pb-2">
                                                                            <div className="flex pl-2">
                                                                                {
                                                                                    order.orderId
                                                                                }
                                                                            </div>
                                                                            <div className="flex">
                                                                                {new Date(
                                                                                    order.createdAt
                                                                                ).toLocaleString(
                                                                                    "en-US"
                                                                                )}
                                                                            </div>
                                                                            <button className="bg-red-400 p-1 rounded-md mb-2 -mt-1 px-3 hover:bg-red-600 transition duration-300">
                                                                                <Link
                                                                                    to={`/receipt/${order.orderId}`}
                                                                                >
                                                                                    Click
                                                                                    to
                                                                                    view
                                                                                    receipt
                                                                                </Link>
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionSeven" && (
                                    <div className="text-black">
                                        <UserSettings />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {!user && (
                        <div className="w-screen h-screen text-center">
                            <Spinner />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserAccount;