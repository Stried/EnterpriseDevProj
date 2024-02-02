import { useEffect, useState } from "react";
import http from "./../../http";
import { useParams } from "react-router-dom";

function GroupMain() {
    let { grpId } = useParams();

    const [groupDetails, setGroupDetails] = useState([]);
    const [groupLeader, setGroupLeader] = useState([]);
    const [groupUserList, setGroupUserList] = useState([]);

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

    }, [groupDetails]);

    return (
        <div className="min-h-screen max-h-full">
            {groupUserList && (
                <div className="">
                    <div className="h-1/4">
                        <p>Image goes here</p>
                    </div>
                    <h1>
                        Group Name Goes Here <br />
                        Group Leader: {groupLeader.name} <br />
                        No. of Members: {groupDetails.length}
                    </h1>
                    <div className="">
                        <p>Members:</p>
                        {groupUserList.map((user, i) => {
                            return <div className="">{user.name}</div>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupMain;
