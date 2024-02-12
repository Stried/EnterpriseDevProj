import { useEffect, useState } from "react";
import http from "../../http";
import { Badge, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function AdminAllTickets() {
    const navigate = useNavigate();
    const [ userTicketList, setUserTicketList ] = useState([]);

    useEffect(() => {
        http.get("/ticket/getAllUserTicketsAdmin", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
        })
            .then((res) => {
                setUserTicketList(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    })
    return (
        <div className="my-5">
            { userTicketList.map((tickets, i) => {
                return (
                    <div onClick={() => navigate(`/support/ticket/${tickets.id}`)} className="mb-3 px-5 py-3 bg-gray-100 rounded-md cursor-pointer">
                        <div className="flex">
                            <h1 className="text-xl font-medium grow">
                                {tickets.ticketHeader}
                            </h1>

                            <p className="flex">
                                <span>Status: </span>
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
                            </p>
                        </div>
                        <p className="text-md">
                            Category: {tickets.ticketCategory}
                        </p>

                        <div className="flex mt-7">
                            <div className="">
                                <Avatar
                                    rounded
                                    size={"md"}
                                    className=""
                                    img={tickets.user.imageFile}
                                />
                            </div>
                            <p className="font-medium my-auto ml-3 text-md grow">
                                <span className="text-sky-700">
                                    {tickets.user.name}
                                </span>
                            </p>
                            <p className="text-sky-700 my-auto">
                                {dayjs(tickets.createdAt).format(
                                    "DD MMM YYYY, h:mma"
                                )}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default AdminAllTickets