import { useFormik } from "formik";
import { useEffect, useState } from "react";
import http from "../../http";
import * as yup from "yup";

import { Spinner, Card, Avatar, theme } from "flowbite-react";

function FriendRequest() {
    const [ friendRequestsList, setFriendRequestsList ] = useState([]);

    useEffect(() => {
        http.get("/friends/allFriendRequests", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.data);
                setFriendRequestsList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const approveUserRequest = (id) => {
        http.put(`/friends/approveRequest/${id}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    const denyUserRequest = (id) => {
        http.delete(`/friends/approveDelete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.status);
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    return (
        <div className="m-10 p-5">
            <h1 className="text-2xl">View Friend Request(s)</h1>
            <p>Number of Requests pending: {friendRequestsList.length}</p>
            {friendRequestsList.length == 0 && (
                <div className="">You poor soul, theres none</div>
            )}

            <div className="grid grid-cols-2 my-10">
                {friendRequestsList.length != 0 &&
                    friendRequestsList.map((user, i) => {
                        return (
                            <div className="flex mr-2 mb-2 bg-gray-100 p-5 rounded-md drop-shadow-md">
                                <div className="w-1/3">
                                    <Avatar
                                        rounded
                                        size={"lg"}
                                        className=""
                                        img={user.user.imageFile}
                                    />
                                </div>
                                <div className="my-auto grow">
                                    <p>{user.user.name}</p>
                                    <p>{user.user.email}</p>
                                </div>
                                <div className="place-self-end float-right space-x-2">
                                    <button
                                        onClick={() => {
                                            denyUserRequest(user.fromUser);
                                        }}
                                        className="px-2 py-1 bg-red-400 rounded-md"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => {
                                            approveUserRequest(user.fromUser);
                                        }}
                                        className="px-2 py-1 bg-green-300 rounded-md"
                                    >
                                        Approve
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default FriendRequest;
