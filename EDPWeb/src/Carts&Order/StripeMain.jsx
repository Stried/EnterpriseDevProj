import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./PaymentForm";
import http from "./../../http"
import { Link } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51OgjtNJakcaB2mxPRKjRlPGJs3MxAZy7vcEjMLihXc74dQgcKajaMcYMUAGiitmNmAQyqnSuRipkfYkIOSvCXU3F00j9ziTBk5");

function Stripe() {
    const [cartItemList, setCartItemList] = useState([]);
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    let total = 0;

    useEffect(() => {
        http.get("/cart/getMyCartItems", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setCartItemList(res.data);
                console.log(res.data);
                // Calculate total after fetching cart items
                res.data.forEach((cartItem) => {
                    total = total + (cartItem.event.eventPrice * cartItem.quantity);
                });
                // Proceed to payment only after fetching cart items
                const payment = {
                    Amount: total * 100,
                    Currency: "sgd"
                };
                http.post("/payment/CreatePaymentIntent", payment)
                    .then((data) => {
                        setClientSecret(data.data.clientSecret);
                        setClientId(data.data.id)
                        console.log(data.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const cancelPayment = () => {
        http.post(`/payment/CancelPaymentIntent/${clientId}`)
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="mt-10 flex flex-col">
            <div className="flex justify-around ml-5">
                <button
                    onClick={cancelPayment} 
                    className="bg-red-500 py-2 px-3 rounded-lg font-semibold float-left hover:bg-red-800 hover:text-white transition duration-300">
                    <Link
                        to="/checkout">
                        Return?
                    </Link>
                </button>
                <div></div>
                <div></div>
            </div>
            <div className="flex text-5xl font-semibold justify-center">
                Checkout
            </div>
            <div>
                <div className="flex flex-col w-2/3 mt-5 bg-orange-400 mx-auto rounded-md">
                    <span className="font-semibold flex justify-center text-3xl mt-3">
                        Order Summary
                    </span>
                    <div className="custom-scrollbar overflow-y-scroll h-64 my-5 w-11/12 mx-auto bg-orange-200 rounded-md">
                        {
                            cartItemList.map((cartItem, i) => {
                                return (
                                    <div
                                        key={cartItem}
                                        className="ml-3">
                                        <div className="p-2 flex justify-between">
                                            <div className="flex">
                                                <img
                                                    src="../src/assets/backgroundMain1.jpg"
                                                    className="w-48 rounded-lg"
                                                ></img>
                                                <div className="ml-3">
                                                    <div className="font-bold text-xl text-wrap">
                                                        {cartItem.event.eventName}
                                                    </div>
                                                    <div className="">
                                                        Qty: {cartItem.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold">
                                                ${cartItem.event.eventPrice * cartItem.quantity}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}

export default Stripe;