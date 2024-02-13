import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";

function Receipt() {
    let { id } = useParams();
    const [orderItemsList, setOrderItemList] = useState([]);

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


    return (
        <dv>
            {
                orderItemsList.map((orderItem, i) => {
                    return (
                        <div key={orderItem}>
                            <div>
                                {orderItem.event.eventName}
                            </div>
                            <div>
                                {orderItem.event.eventPrice}
                            </div>
                        </div>
                    )
                })
            }
        </dv>
    )
}

export default Receipt;