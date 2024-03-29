import { useContext, useEffect, useState } from "react";
import http from "./../../http";
import { useParams } from "react-router-dom";
import { Spinner, Card, Avatar } from "flowbite-react";
import UserContext from "../Users/UserContext";

function GroupMain() {
    let { grpId } = useParams();

    const [ currentUser, setCurrentUser ] = useState("");
    const [ groupDetails, setGroupDetails ] = useState([]);
    const [ groupLeader, setGroupLeader ] = useState([]);
    const [ groupUserList, setGroupUserList ] = useState([]);
    const [ groupInfo, setGroupInfo ] = useState("");

    useEffect(() => {
        http.get("/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setCurrentUser(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    })

    useEffect(() => {
        http.get(`/group/getGroupInfo/${grpId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setGroupInfo(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    })

    useEffect(() => {
        http.get(`group/groupDetails/${grpId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setGroupDetails(res.data);

                // Getting Group Leader Details
                var userLeader = res.data.at(0);

                http.get(`/user/${userLeader.userID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                    .then((res) => {
                        setGroupLeader(res.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                // Getting individual user details
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        var userIdList = [];
        groupDetails.map((user, i) => {
            userIdList.push(user.userID)
        })

        // 18,19
        http.get(`/group/getAllUsers/${userIdList.toString()}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setGroupUserList(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })

    }, [ groupDetails ]);
    
    const kickUserFromGroup = (userId) => {
        var groupId = grpId;
        http.delete(`/group/removeUser/${groupId}/${userId}`, {
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
        })
    }

    return (
        <div className="min-h-screen max-h-full">
            {groupUserList && (
                <div className="">
                    <div className="my-5 mx-12">
                        <h1 className="text-2xl font-medium tracking-wider">
                            {groupInfo.groupName}
                        </h1>
                        <h2>
                            Group Leader:{" "}
                            <span className="font-semibold">
                                {groupLeader.name}
                            </span>
                        </h2>
                        <h2>
                            No. of Members: <span className="font-semibold">{groupDetails.length}</span>
                        </h2>

                        <p className="mt-5 text-xl font-semibold py-1">Members:</p>
                        <div className="grid grid-cols-3">
                            {groupUserList.map((user, i) => {
                                return (
                                    <div className="mb-2 mr-2 bg-slate-200 px-3 py-4 rounded">
                                        <Avatar
                                            rounded
                                            size={"lg"}
                                            className=""
                                            img={user.imageFile}
                                        />
                                        <h1 className="text-center py-1 font-semibold">
                                            {user.name}
                                        </h1>
                                        <p className="text-center">
                                            {user.email}
                                        </p>

                                        {groupLeader.id == currentUser.id && (
                                            <div className="mx-auto text-center mt-4">
                                                <button onClick={() => kickUserFromGroup(user.id)} className="bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md font-medium">Kick</button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupMain;
