import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "./../../http"

function PurchaseComplete() {
    const [cartItemList, setCartItemList] = useState([]);

    useEffect(() => {
        http.get("/cart/getMyCartItems", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.data)
                setCartItemList(res.data);
                console.log(cartItemList)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const delay = 2000; // 2 seconds in milliseconds
        const timerId = setTimeout(() => {
            http.post("/order/NewOrder", null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {
                console.log(cartItemList)
                console.log(cartItemList[ 0 ].event.eventId);
                console.log(cartItemList[0].subTotal)
                for (var i = 0; i < cartItemList.length; i++) {
                    const formData = {
                        // Please note that when taking from a json response, first letter is always small
                        Quantity: cartItemList[i].quantity,
                        SubTotal: cartItemList[ i ].subTotal,
                        // Error also caused by fact that cartItemList[i] returns undefined, u can test it if you want.
                        // Changed to cartItemList.Event.EventId to referece event Id from event object
                        EventId: cartItemList[i].event.eventId
                    }
                    http.post("/order/CreateOrderItem", formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    })
                        .then((res) => console.log(res.status + " check"))
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }, delay);

        return () => {
            clearTimeout(timerId); // Cleanup function to clear the timer if component unmounts before 5 seconds
        };
    }, [cartItemList]);

    return (
        <div className="bg-gray-200 pt-2 pb-40">
            <div className="text-6xl font-semibold flex justify-center items-center pt-48">
                Purchase Completed
            </div>
            <div className="text-2xl mx-auto flex justify-center text-center font-semibold mt-10">
                Your purchase has been completed
                <br />
                Thank you and have a nice day!
            </div>
            <div className="flex justify-evenly mt-10">
                <div className="bg-orange-400 px-3 py-2 rounded-xl font-semibold text-xl hover:shadow-lg hover:bg-orange-600 hover:text-white transition duration-300">
                    <Link
                        to="/">
                        Return Home
                    </Link>
                </div>
                <div className="bg-orange-400 px-3 py-2 rounded-xl font-semibold text-xl hover:shadow-lg hover:bg-orange-600 hover:text-white transition duration-300">
                    <Link
                        to="/">
                        View Receipt
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PurchaseComplete;