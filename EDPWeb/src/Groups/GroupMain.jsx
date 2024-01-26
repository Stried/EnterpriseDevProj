import { useEffect, useState } from "react";
import http from "./../../http";
import { useParams } from "react-router-dom";

function GroupMain() {
    let { grpId } = useParams();

    const [ groupDetails, setGroupDetails ] = useState([]);
    const [ groupLeader, setGroupLeader ] = useState([]);
    useEffect(() => {
        http.get(`group/groupDetails/${grpId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setGroupDetails(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        var userLeader = groupDetails[ 0 ]
        console.log(userLeader)
        
        http.get(`/user/${userLeader.userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setGroupLeader(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [grpId, groupDetails])

    return (
        <div className="min-h-screen max-h-full">
            <div className="h-1/4">
                <p>
                    Image goes here
                </p>
            </div>
            <h1>
                Group Name Goes Here <br />
                Group Leader: {groupLeader.name} <br />
                No. of Members: {groupDetails.length}
            </h1>
            <div className="">
                <p>
                    Members:
                </p>
                { groupDetails.map((user, i) => {
                    return (
                        <div className="">
                            {user.userID}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GroupMain;