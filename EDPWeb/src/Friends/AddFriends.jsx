import { useFormik } from "formik";
import { useEffect, useState } from "react";
import http from "../../http";
import * as yup from "yup";

import { Spinner, Card, Avatar, theme } from "flowbite-react";

function AddFriends() {
    const [ userCheck, setUserCheck ] = useState([]);
    const [ search, setSearch ] = useState("");

    const [ userList, setUserList ] = useState([]);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const searchUsers = () => {
        console.log(search)
        http.get(`/friends/searchUserEmail?search=${search}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        }).then((res) => {
            console.log(res.data);
            setUserCheck(res.data);
        });
    };

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchUsers();
        }
    };

    useEffect(() => {
        http.get("/user/getAllUsers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                setUserList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    const sendFriendRequest = (id) => {
        console.log(id);
        var sendRequestForm = new FormData();
        sendRequestForm.append("UserID", id);

        http.post("/friends/sendRequest", sendRequestForm, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.status);
            })
            .catch(function (err) {
                console.log(err);
            });
        
    }

    return (
        <div className="flex space-x-3 m-10">
            <div className="w-1/3 p-5">
                <h1 className="text-2xl">Send Friend Request</h1>
                <div className="my-4">
                    <label
                        htmlFor="Email"
                        className="font-semibold text-lg"
                    >
                        Email Address
                    </label>
                    <p className="opacity-70 italic">
                        Search a friend's email address here
                    </p>
                    <input
                        value={search}
                        placeholder="Search"
                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                        onChange={onSearchChange}
                        onKeyDown={onSearchKeyDown}
                    />
                    <br />
                    <button
                        onClick={() => searchUsers()}
                        className="px-3 py-2 bg-red-400 rounded"
                    >
                        Search
                    </button>
                </div>

                <hr className="my-5 mx-auto border-2 border-gray-400" />

                <div className="my-2 space-y-3">
                    {userCheck &&
                        userCheck.map((user, i) => {
                            return (
                                <div className="text-black bg-gray-100 p-4 rounded-md drop-shadow-lg flex">
                                    <div className="w-1/3">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className=""
                                            img={user.imageFile}
                                        />
                                    </div>
                                    <div className="">
                                        <p>{user.name}</p>
                                        <p className="font-medium">
                                            {user.email}
                                        </p>

                                        <button onClick={() => sendFriendRequest(user.id)} className="py-2 px-3 mt-3 bg-orange-400 rounded-md">
                                            Send Request
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    {!userCheck && (
                        <div className="">
                            <p>Please type in an email to find the user</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-2/3 p-5">
                <h1 className="text-2xl">Friend Recommendations</h1>
                <div className="">
                    <h2>Meet someone new today!</h2>

                    <div className="grid grid-cols-2">
                        {userList.map((userAcc, i) => {
                            return (
                                <div className="text-black bg-gray-100 p-4 rounded-md drop-shadow-lg flex  mr-3 mb-3">
                                    <div className="w-1/3">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className=""
                                            img={userAcc.imageFile}
                                        />
                                    </div>
                                    <div className="">
                                        <p>{userAcc.name}</p>
                                        <p className="font-medium">
                                            {userAcc.email}
                                        </p>

                                        <button
                                            onClick={() =>
                                                sendFriendRequest(userAcc.id)
                                            }
                                            className="py-2 px-3 mt-3 bg-orange-400 rounded-md"
                                        >
                                            Send Request
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFriends