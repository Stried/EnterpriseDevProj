import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import http from "../../http";

function Receipt() {
    let { id } = useParams();
    const [orderItemsList, setOrderItemList] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([])

    useEffect(() => {
        console.log(id);
        http.get(`/order/GetOrderItem/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
        })
            .then((res) => {
                setOrderItemList(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        http.get(`/order/GetMySpecificOrder/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setOrder(res.data)
                console.log(res.data.user)
                setUser(res.data.user)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [id]);

    return (
        <div className="bg-gray-200 py-10 h-screen">
            <div className="text-5xl font-bold flex text-center justify-center w-full">
                Viewing Receipt
                <br />
                No. {order.orderId}
            </div>
            <div className=" flex flex-col mt-5 bg-zinc-400 w-6/12 rounded-lg mx-auto">
                <div className="flex flex-row justify-center text-xl mb-5">
                    <div className="flex flex-col py-2 px-3">
                        <div className="mt-2">
                            <span className="font-semibold">Customer Name: </span>{user.name}
                        </div>
                        <div className="mt-2">
                            <span className="font-semibold">Customer Phone: </span>{user.phoneNumber}
                        </div>
                        <div className="mt-2">
                            <span className="font-semibold">Customer Email: </span>{user.email}
                        </div>
                    </div>
                    <div className="flex flex-col py-2 px-3">
                        <div className="mt-2">
                            <span className="font-semibold">Receipt Name: </span>{order.orderId}
                        </div>
                        <div className="mt-2">
                            <span className="font-semibold">Purchased At: </span>{new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>
                <div className="flex-col flex text-xl justify-center w-11/12 mx-auto">
                    <div>
                        <div className="bg-red-400 grid grid-cols-5 font-semibold justify-between text-center px-2 border-b-2 border-zinc-200 py-2 rounded-t-2">
                            <div className="">
                                Item No.
                            </div>
                            <div className="">
                                Item Name
                            </div>
                            <div>
                                Quantity
                            </div>
                            <div>
                                Price per Item
                            </div>
                            <div>
                                SubTotal
                            </div>
                        </div>
                    </div>
                    <div className="pb-5">
                        {
                            orderItemsList.map((orderItem, i) => {
                                return (
                                    <div key={orderItem} className="grid grid-cols-5 text-center items-center px-2 py-2 border-b-2">
                                        <div>
                                            {i + 1 + ". "}
                                        </div>
                                        <div className="">
                                            {orderItem.event.eventName}
                                        </div>
                                        <div>
                                            {orderItem.quantity}
                                        </div>
                                        <div>
                                            ${orderItem.event.eventPrice}
                                        </div>
                                        <div>
                                            ${orderItem.quantity * orderItem.event.eventPrice}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10 text-xl font-semibold bg-red-400 w-1/12 mx-auto text-center rounded hover:bg-red-600 hover:text-white transition duration-300">
                <Link
                    to="/">
                    Return Home?
                </Link>
            </div>
        </div>
    )
}

export default Receipt;