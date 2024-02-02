import React, { useContext, useEffect, useState } from 'react'
import http from "../../http";
import UserContext from '../Users/UserContext';
import { useNavigate, useParams } from "react-router-dom";
import *  as yup from "yup";
import { useFormik, validateYupSchema } from 'formik';

function Cart() {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    const [ cartItemList, setCartItemList ] = useState([]);
    const [ cartItemQuantity, setCartItemQuantity ] = useState(98);

    let quantityMessage;
    if (cartItemList.length <= 1) {
        quantityMessage = `Item: ${cartItemList.length}`
    }
    else {
        quantityMessage = `Items: ${cartItemList.length}`
    }

    const updateQuantity = (id, currentItemQuantity) => {
        // Quantity update is passed in correctly
        console.log("CurrentItemQuantity: " + currentItemQuantity);

        http.put(`/cart/updateCartItem/${id}`, currentItemQuantity, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.data);
                console.log("CurrentItemQuantity: " + currentItemQuantity);
                window.location.reload();
                // create a function to recall
            })
            .catch(function (err) {
                console.log(err);
            })
        
    }

    useEffect(() => {
        http.get("/cart/getMyCartItems", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                setCartItemList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 pb-10">
            <div className='relative'>
                <img src="../src/assets/u-sports-banner.jpg" className='w-full' />
                <div class="absolute inset-0 flex items-center justify-center">
                    <h1 className='text-white font-bold text-8xl'>Your Cart</h1>
                </div>
            </div>
            <div className='grid grid-col-2'>
                <div className='text-2xl font-bold ml-5 my-2.5'>{quantityMessage}</div>
                <div className='justify-self-end float-right'>
                    test
                </div>
            </div>
            <div className='flex justify-left items-center'>
                {
                    cartItemList.map((cartItem, i) => {
                        return (
                            <div
                                key={cartItem.cartItemId}
                                className="m-5 border rounded-md bg-zinc-300 w-3/4"
                            >
                                <div className="m-5 flex">
                                    <img
                                        src="../src/assets/backgroundMain1.jpg"
                                        className="w-96 h-64 rounded-lg"
                                    ></img>
                                    <div className="pl-5 content-between grid grid-col-2 w-auto">
                                        <div className="">
                                            <div className="text-3xl font-bold pb-3">
                                                {cartItem.event.eventName}
                                            </div>
                                            <div className="text-3xl">
                                                $
                                                {cartItem.event.eventPrice *
                                                    cartItem.quantity}
                                            </div>
                                            <div className="text-xl text-zinc-600">
                                                ${cartItem.event.eventPrice}{" "}
                                                each
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <button className="border-y-2 border-l-2 border-black text-3xl p-2 rounded-l-lg w-12">
                                                -
                                            </button>
                                            <div className="p-2 border-2 border-black text-3xl text-center w-20 bg-zinc-300 focus:border-orange-400 focus:ring-orange-400">
                                                {cartItem.quantity}
                                            </div>
                                            <button
                                                className="border-y-2 border-r-2 border-black text-3xl p-2 rounded-r-lg w-12"
                                                onClick={() => updateQuantity(cartItem.cartItemId, (cartItem.quantity + 1))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}


export default Cart