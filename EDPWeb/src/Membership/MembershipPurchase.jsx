import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import http from "./../../http";

import CheckoutForm from "./PaymentFormMember";

function MembershipPurchase() {
    let { membershipType } = useParams();
    

    const stripePromise = loadStripe(
        "pk_test_51OgjtNJakcaB2mxPRKjRlPGJs3MxAZy7vcEjMLihXc74dQgcKajaMcYMUAGiitmNmAQyqnSuRipkfYkIOSvCXU3F00j9ziTBk5"
    );

    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [ membershipName, setMembershipName ] = useState("");
    useEffect(() => {
        if (membershipType == "FriendsOfUPlay") {
            const membershipDetails = {
                typeMembership: "Friends of UPlay",
                costMembership: 9.99
            }

            setMembershipName(membershipDetails)
        } else if (membershipType == "NTUCMember") {
            const membershipDetails = {
                typeMembership: "NTUC Member",
                costMembership: 14.99
            }

            setMembershipName(membershipDetails)
        }
    }, [])

    // Courtesy of Chun Kiat's StripeAPI implementation
    useEffect(() => {
        const payment = {
            Amount: membershipName.costMembership * 100,
            Currency: "sgd",
        };
        http.post("/payment/CreatePaymentIntent", payment)
            .then((data) => {
                setClientSecret(data.data.clientSecret);
                setClientId(data.data.id);
                console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ membershipName ])
    
    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance,
    };

    const cancelPayment = () => {
        http.post(`/payment/CancelPaymentIntent/${clientId}`).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="my-10">
            <div className="text-center">
                <h1 className="text-xl">
                    Membership Subscription - {membershipName.typeMembership}
                </h1>
                <p className="text-lg">
                    Please confirm the payment for 
                    <span className="font-semibold"> ${membershipName.costMembership}</span>
                </p>
                {clientSecret && (
                    <Elements
                        options={options}
                        stripe={stripePromise}
                    >
                        <CheckoutForm memberType={membershipType} />
                    </Elements>
                )}
            </div>
        </div>
    );
}

export default MembershipPurchase;