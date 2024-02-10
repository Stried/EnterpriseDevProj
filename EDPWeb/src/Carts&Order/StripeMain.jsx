import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./PaymentForm";
import http from "./../../http"
const stripePromise = loadStripe("pk_test_51OgjtNJakcaB2mxPRKjRlPGJs3MxAZy7vcEjMLihXc74dQgcKajaMcYMUAGiitmNmAQyqnSuRipkfYkIOSvCXU3F00j9ziTBk5");

export default function Stripe() {

    const [clientSecret, setClientSecret] = useState("pi_3Oi6yOJakcaB2mxP0KzPRp8p_secret_5g2cEbPpH8AvacJ2TNQQ5joPP");
    const payment = {
        Amount: 500,
        Currency: "sgd"
    }

    useEffect(() => {
        http.post("/payment/CreatePaymentIntent", payment)
            .then((data) => {
                setClientSecret(data.data);
                console.log(data.data)
                console.log(clientSecret)
            })
    }, []);


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}