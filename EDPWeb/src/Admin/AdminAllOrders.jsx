import { useEffect, useState } from "react";
import http from "../../http";

function AdminAllOrders() {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        http.get("/orders/GetAllOrders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setOrderList(res.data);
                console.log(res.data)
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    return (
        <div>
            <div>
                {orderList.map((order, i) => {
                    return (
                        <div key={i}>
                            {i != orderList.length - 1 && (
                                <div className="bg-gray-100 font-light text-black content-center my-3 flex flex-col-3 justify-between py-2 pl-6 pr-2 justify-items-center border-b-2 border-zinc-200 pb-2">
                                    <div className="flex pl-2">
                                        {order.orderId}
                                    </div>
                                    <div className="flex">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString("en-US")}
                                    </div>
                                    <button className="bg-red-400 p-1 rounded-md mb-2 -mt-1 px-3 hover:bg-red-600 transition duration-300">
                                        <Link to={`/receipt/${order.orderId}`}>
                                            Click to view receipt
                                        </Link>
                                    </button>
                                </div>
                            )}
                            {i == orderList.length - 1 && (
                                <div className="bg-gray-100 text-black content-center my-3 flex flex-col-3 justify-between py-2 pl-6 pr-2 justify-items-center border-b-2 border-zinc-200 pb-2">
                                    <div className="flex pl-2">
                                        {order.orderId}
                                    </div>
                                    <div className="flex">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString("en-US")}
                                    </div>
                                    <button className="bg-red-400 p-1 rounded-md mb-2 -mt-1 px-3 hover:bg-red-600 transition duration-300">
                                        <Link to={`/receipt/${order.orderId}`}>
                                            Click to view receipt
                                        </Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminAllOrders;
