import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formikOrder = useFormik({
        enableReinitialize: true,
        initialValues: {
            CustomerName: "",
            CustomerEmail: "",
            CustomerPhone: 0,
        },
        validationSchema: yup.object().shape({
            CustomerName: yup
                .string()
                .trim()
                .min(3, "Name must be at least 3 characters long.")
                .max(50, "Name must be at most 50 characters long.")
                .required("Name is required."),
            CustomerEmail: yup
                .string()
                .trim()
                .email("Please enter a valid email account.")
                .required("Email is required."),
            CustomerPhone: yup
                .number()
                .typeError("Phone Number must be a Singaporean Number.")
                .integer("Phone Number must be a Singaporean Number.")
                .min(80000000, "Phone Number must be a Singaporean Number.")
                .max(99999999, "Phone Number must be a Singaporean Number.")
                .required("Phone Number is required."),
        }),
        onSubmit: async (data) => {
            const formData = {
                CustomerName: (data.CustomerName = data.CustomerName.trim()),
                CustomerEmail: (data.CustomerEmail = data.CustomerEmail.trim()),
                CustomerPhone: (data.CustomerPhone = data.CustomerPhone),
            };

            if (!stripe || !elements) {
                // Stripe.js hasn't yet loaded.
                // Make sure to disable form submission until Stripe.js has loaded.
                return;
            }

            setIsLoading(true);

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: "http://localhost:3000/purchaseComplete",
                },
            });

            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.
            if (
                error.type === "card_error" ||
                error.type === "validation_error"
            ) {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }

            setIsLoading(false);

            await http
                .post("/order/NewOrder", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                });
        },
    });

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage(
                        "Your payment was not successful, please try again."
                    );
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/purchaseComplete",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="mb-20">
            <form
                id="payment-form"
                onSubmit={handleSubmit}
                className="mt-10 grid grid-col-1 w-2/3 mx-auto"
            >
                <div>
                    <PaymentElement
                        options={paymentElementOptions}
                        className=" mx-auto"
                    />
                </div>
                <div>
                    <label>Customer Name</label>
                    <input
                        type="text"
                        id="CustomerName"
                        name="CustomerName"
                    />
                </div>
                <div>
                    <label>Customer Email</label>
                    <input
                        type="text"
                        id="CustomerEmail"
                        name="CustomerEmail"
                    />
                </div>
                <div>
                    <label>Customer Phone</label>
                    <input
                        type="text"
                        id="CustomerPhone"
                        name="CustomerPhone"
                    />
                </div>
                <div className="mt-4 flex items-end">
                    <button
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                        type="submit"
                        className="bg-orange-400 text-white font-semibold rounded-md py-3 px-4 text-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full transition duration-200 ease-in-out"
                    >
                        <span className="flex items-center justify-center">
                            {isLoading ? (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white justify-center"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Pay now"
                            )}
                        </span>
                    </button>
                </div>
                {/* Show any error or success messages */}
                {message && (
                    <div className="text-gray-600 leading-5 pt-3 text-center text-xl">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
export default PaymentForm;
