import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { Spinner, Card, Avatar, theme } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import http from "./../../http";

import { MdEmail, MdPhone } from "react-icons/md";
import { FaPen, FaRegUser } from "react-icons/fa";

import UserSettings from "./UserSettings";


function UserAccount() {
    const [ user, setUser ] = useState("");
    const [ currentOption, setCurrentOption ] = useState("optionOne");
    const [ groupsList, setGroupsList ] = useState([]);
    const [ groupsLengthList, setGroupsLengthList ] = useState([]);
    const [ friendsList, setFriendsList ] = useState([]);

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
                    )}`, // This is needed for mine for some reason, not part of the practical
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
                    )}`, // This is needed for mine for some reason, not part of the practical
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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                // creates a list to store the lengths of all the grps in the list
                var listLength = res.data.length;
                console.log(listLength)
                groupsLengthList.push(listLength);
                console.log(groupsLengthList)
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    useEffect(() => {
        groupsList.map((groups, i) => {
            getUserLength(groups.id);
        })
    }, [ groupsList ])
    
    useEffect(() => {
        http.get("/friends/allFriendRequests", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.data);
                setFriendsList(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [])
    
    return (
        <div className="">
            {/* change to theme */}
            {user && (
                <div
                    className={`min-h-[100vh] max-h-full bg-gradient-to-b from-orange-300 to-red-400`}
                >
                    {user && (
                        <div
                            className={`p-5 flex space-x-6 backdrop-brightness-90 min-h-[100vh] text-black`}
                        >
                            <div className="w-1/3">
                                <div
                                    className={`flex bg-stone-100 p-5 rounded-lg shadow-md`}
                                    id="userProfile"
                                >
                                    <div className="w-1/3">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className=""
                                            img={user.imageFile}
                                        />
                                    </div>
                                    <div className="w-2/3">
                                        <h1 className="text-3xl font-medium">
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
                                    className={`flex flex-col space-y-3 mt-5 bg-stone-100 p-5 rounded-lg shadow-md`}
                                    id="optionsMenu"
                                >
                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionOne"
                                                ? `bg-red-400`
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
                                            (currentOption == "optionTwo"
                                                ? `bg-red-400`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionTwo")
                                        }
                                    >
                                        <button>Membership</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionThree"
                                                ? `bg-red-400`
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
                                                ? `bg-red-400`
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
                                                ? `bg-red-400`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionFive")
                                        }
                                    >
                                        <button>Placeholder Option 5</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-orange-300 cursor-pointer ` +
                                            (currentOption == "optionSix"
                                                ? `bg-red-400`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionSix")
                                        }
                                    >
                                        <button>Settings</button>
                                    </div>
                                </nav>
                            </div>
                            <div
                                className={`w-2/3 p-10 bg-stone-100 text-black rounded-lg`}
                            >
                                {currentOption == "optionOne" && (
                                    <div className="">
                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                FULL NAME{" "}
                                                <FaPen className="my-auto mx-2" />
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.name}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                NRIC{" "}
                                                <FaPen className="my-auto mx-2" />
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.nric}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                EMAIL ADDRESS{" "}
                                                <FaPen className="my-auto mx-2" />
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.email}
                                            </h2>
                                        </div>

                                        <div className="pb-7">
                                            <p className="text-lg flex">
                                                PHONE NUMBER{" "}
                                                <FaPen className="my-auto mx-2" />
                                            </p>
                                            <h2 className="text-2xl font-medium leading-6">
                                                {user.phoneNumber}
                                            </h2>
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionTwo" && (
                                    <div className="text-black">HAH GAY</div>
                                )}

                                {currentOption == "optionThree" && (
                                    <div className="text-black">
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
                                        <div className="my-5 grid grid-cols-3">
                                            {groupsLengthList &&
                                            groupsList.length != 0 ? (
                                                groupsList.map((groups, i) => {
                                                    return (
                                                        <div className="bg-stone-100 px-4 py-5 rounded-md shadow-lg mr-4 mb-4">
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
                                                <div className="">
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
                                    <div className="text-black">
                                        <div className="">
                                            <h1 className="text-3xl font-light">
                                                Friends
                                            </h1>
                                            <p className="flex space-x-3 underline">
                                                <Link
                                                    to={"/"}
                                                    className="text-blue-500 visited:text-purple-500"
                                                >
                                                    Add A Friend
                                                </Link>

                                                <Link
                                                    to={"/"}
                                                    className="text-blue-500 visited:text-purple-500"
                                                >
                                                    Friend Request(s)
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="my-5 grid grid-cols-3">
                                            {friendsList == 0 ? (
                                                <div className="">
                                                    <p className="mb-5">
                                                        You are currently have no friends.
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
                                                            href="/joinGroup"
                                                            className="text-blue-500 visited:text-purple-500 font-medium"
                                                        >
                                                            Approve Here
                                                        </a>
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    You have some friends
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionFive" && (
                                    <div className="text-black">HAH GAY</div>
                                )}

                                {currentOption == "optionSix" && (
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