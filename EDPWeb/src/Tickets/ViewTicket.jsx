import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";

import { Badge } from 'flowbite-react';
import { Button, Timeline } from "flowbite-react";

function ViewTicket() {
    let { ticketId } = useParams();
    const [ ticketDetails, setTicketDetails ] = useState("");
    const [ ticketImages, setTicketImages ] = useState([]);

    useEffect(() => {
        http.get(`/ticket/getOneTicket/${ticketId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setTicketDetails(res.data);


                setTicketImages(res.data.attachedFilename.split(","));
                console.log(res.data.attachedFilename.split(","));
                console.log(ticketImages);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-800 to-red-700 py-10">
            {ticketDetails && (
                <div className="mx-auto  w-2/3 rounded-md text-blue-950 bg-gray-100 p-10">
                    <h1 className="text-2xl font-semibold">
                        {ticketDetails.ticketHeader}
                    </h1>
                    <p className="text-lg mb-4 flex">
                        Status:{" "}
                        {ticketDetails.ticketStatus.toLowerCase() == "open" && (
                            <Badge
                                color="warning"
                                className="w-fit text-sm my-auto mx-2"
                            >
                                Open
                            </Badge>
                        )}
                        {ticketDetails.ticketStatus.toLowerCase() ==
                            "close" && (
                            <Badge
                                color="success"
                                className="w-fit text-sm my-auto mx-2"
                            >
                                Close
                            </Badge>
                        )}
                    </p>
                    <h2 className="text-sm mb-2">
                        Ticket Sender: {ticketDetails.senderEmail}
                    </h2>

                    <p className="text-md font-medium mt-5">
                        Issue Description
                    </p>
                    <p className="text-lg">{ticketDetails.ticketBody}</p>
                    <div className="overflow-x-auto mx-auto my-10 flex flex-row h-[40vh] space-x-2">
                        {ticketImages &&
                            ticketImages.map((ticketImage, i) => {
                                return (
                                    <img
                                        key={i}
                                        className="flex-auto object-contain max-h-full"
                                        src={`${
                                            import.meta.env.VITE_FILE_BASE_URL
                                        }${ticketImage}`}
                                        alt="Image"
                                    />
                                );
                            })}
                    </div>
                    <div className="w-full flex flex-row-reverse">
                        <button className="px-3 py-2 bg-slate-800 font-medium text-white hover:text-emerald-400 transition duration-300 ease-in-out rounded-md">
                            Add a comment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewTicket;
