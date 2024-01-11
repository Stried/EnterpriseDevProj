import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { Spinner, Card, Avatar, theme } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import http from "./../../http";

import { MdEmail, MdPhone } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import UserSettings from "./UserSettings";


function UserAccount() {
    const { user } = useContext(UserContext);
    const [ currentOption, setCurrentOption ] = useState("optionOne");
    const [ groupsList, setGroupsList ] = useState([]);
    const [ themeSetting, setTheme ] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/group/getUserGroups", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then((res) => {
                    setGroupsList(res.data);
                    console.log(res.data);
                    console.log(res.data.length);
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
                    console.log(res.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        http.get("/theme/1", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setTheme(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [])
    
    return (
        <div className="">
            {themeSetting && (
                <div
                    className={`min-h-[100vh] max-h-full bg-gradient-to-b from-[${themeSetting.secondary}] to-[${themeSetting.main}]`}
                >
                    {user && (
                        <div
                            className={`p-5 flex space-x-6 backdrop-brightness-90 min-h-[100vh] text-[${themeSetting.text}]`}
                        >
                            <div className="w-1/3">
                                <div
                                    className={`flex bg-[${themeSetting.background}] p-5 rounded-lg shadow-md`}
                                    id="userProfile"
                                >
                                    <div className="w-1/3">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className=""
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
                                    className={`flex flex-col space-y-3 mt-5 bg-[${themeSetting.background}] p-5 rounded-lg shadow-md`}
                                    id="optionsMenu"
                                >
                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionOne"
                                                ? `bg-[${themeSetting.main}]`
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
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionTwo"
                                                ? `bg-[${themeSetting.main}]`
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
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionThree"
                                                ? `bg-[${themeSetting.main}]`
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
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionFour"
                                                ? `bg-[${themeSetting.main}]`
                                                : ``)
                                        }
                                        onClick={() =>
                                            setCurrentOption("optionFour")
                                        }
                                    >
                                        <button>Placeholder Option 4</button>
                                    </div>

                                    <div
                                        className={
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionFive"
                                                ? `bg-[${themeSetting.main}]`
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
                                            `px-3 py-2 rounded-md hover:bg-[${themeSetting.secondary}] cursor-pointer ` +
                                            (currentOption == "optionSix"
                                                ? `bg-[${themeSetting.main}]`
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
                                className={`w-2/3 p-10 bg-[${themeSetting.background}] text-[${themeSetting.text}] rounded-lg`}
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

                                        <button
                                            className="my-10 text-lg"
                                            onClick={() => {
                                                logout();
                                            }}
                                        >
                                            Log Out
                                        </button>
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
                                        <div className="">
                                            {groupsList.length != 0 ? (
                                                groupsList.map((groups) => {
                                                    return (
                                                        <div className="">
                                                            {groups.groupName}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="">
                                                    <p>
                                                        You are currently not
                                                        part of any groups.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {currentOption == "optionFour" && (
                                    <div className="text-black">HAH GAY</div>
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