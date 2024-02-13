import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";

function Receipt() {
    let { id } = useParams();
    const [orderItemsList, setOrderItemList] = useState([]);
    const [order, setOrder] = useState([]);

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
                setOrder(res.data)
                console.log(res.data)
                console.log(order)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [id]);

    console.log(order)

    return (
        <div className="bg-gray-200 pt-10">
            <div className="text-5xl font-bold flex text-center justify-center w-full">
                Viewing Receipt
                <br />
                No. {order.orderId}
            </div>
            <div className=" flex flex-col mt-5 bg-zinc-400 w-5/12 rounded-t-lg mx-auto">
                <div className="flex flex-row justify-center text-xl">
                    <div className="flex flex-col py-2 px-3">
                        <div>
                            <span className="font-semibold">Customer Name: </span>{order.user.name}
                        </div>
                        <div>
                            <span className="font-semibold">Customer Phone: </span>{}
                        </div>
                        <div>
                            <span className="font-semibold">Customer Email: </span>{}
                        </div>
                    </div>
                    <div className="flex flex-col py-2 px-3">
                        <div>
                            <span className="font-semibold">Receipt Name: </span>{order.orderId}
                        </div>
                        <div>
                            <span className="font-semibold">Purchased At: </span>{new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>
                <div className="pt-5 bg-gray-500 flex justify-center w-4/12 mx-auto">
                    {
                        orderItemsList.map((orderItem, i) => {
                            return (
                                <div key={orderItem} className="">
                                    <div>
                                        {orderItem.event.eventName}
                                    </div>
                                    <div>
                                        {orderItem.event.eventPrice}
                                    </div>
                                    <div>
                                        {orderItem.quantity}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Receipt;