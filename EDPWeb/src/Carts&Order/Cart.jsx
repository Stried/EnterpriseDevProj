import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import http from "../../http";
import UserContext from '../Users/UserContext';
import { Link, useParams } from "react-router-dom";
import { Modal } from "flowbite-react";

import { IconContext } from "react-icons";
import { IoMdOpen } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";


function Cart() {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    const [cartItemList, setCartItemList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteItemModal, setOpenDeleteItemModal] = useState(false);
    const options = [
        {
            id: 1,
            label: "Alphabetical (Ascending)"
        },
        {
            id: 2,
            label: "Alphabetical (Descending)"
        },
        {
            id: 3,
            label: "Price (Ascending)"
        },
        {
            id: 4,
            label: "Price (Descending)"
        }
    ]
    const [selected, setSelected] = useState(options[3])

    const handleSort = (option) => {
        let sortedList = [];

        switch (option.label) {
            case "Alphabetical (Ascending)":
                sortedList = cartItemList.slice().sort((a, b) => {
                    const nameA = a.event.eventName.toUpperCase();
                    const nameB = b.event.eventName.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case "Price (Ascending)":
                sortedList = cartItemList.slice().sort((a, b) => (a.event.eventPrice * a.quantity) - (b.event.eventPrice * b.quantity));
                break;
            case "Price (Descending)":
                sortedList = cartItemList.slice().sort((a, b) => (b.event.eventPrice * b.quantity) - (a.event.eventPrice * a.quantity));
                break;
            default:
                sortedList = cartItemList.slice().sort((a, b) => (a.event.eventPrice * a.quantity) - (b.event.eventPrice * b.quantity));
        }
        console.log(option.label)

        setCartItemList(sortedList);
        setSelected(option);
    };

    let total = 0;
    cartItemList.forEach((cartItem) => {
        total = total + (cartItem.event.eventPrice * cartItem.quantity)
    })

    let totalString;
    if (cartItemList.length <= 1) {
        totalString = `Total (${cartItemList.length} Item): $${total.toFixed(2)}`
    }
    else {
        totalString = `Total (${cartItemList.length} Items): $${total.toFixed(2)}`
    }

    let quantityMessage;
    if (cartItemList.length <= 1) {
        quantityMessage = `${cartItemList.length} Item`
    }
    else {
        quantityMessage = `${cartItemList.length} Items`
    }

    const updateQuantity = (id, currentItemQuantity) => {
        // Quantity update is passed in correctly
        console.log("CurrentItemQuantity: " + currentItemQuantity);
        var updateQuantityForm = new FormData();
        updateQuantityForm.append("Quantity", currentItemQuantity)

        http.put(`/cart/updateCartItem/${id}`, updateQuantityForm, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
                "Content-Type": "application/json"
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

    const deleteItem = (id) => {
        http.delete(`/cart/deleteCartItem/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                console.log(res.data);
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
                console.log(res.data)
                setCartItemList(res.data);
                console.log(cartItemList)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, []);

    return ( 
        <div className="text-blue-950 bg-gradient-to-br from-gray-800 to-red-700 pb-10">
            <div className="text-center items-center justify-center">
                <h1 className='text-gray-200 font-bold text-6xl pt-10'>Your Cart</h1><br/>
                <h2 className='text-gray-200 font-semibold text-3xl italic'>Stuff you've ordered goes here!</h2>
            </div>

            {cartItemList.length > 0 && (
                <div>
                    <div className='mt-5 flex justify-between'>
                        <div className='ml-5 text-2xl font-bold px-5 mb-5 bg-zinc-100 rounded-lg items-center flex'>
                            {quantityMessage}
                        </div>
                        <div className={`relative inline-block py-2.5 px-3 mb-5 mr-5 bg-zinc-100 ${isOpen ? 'rounded-none' : 'rounded-lg'}`}>
                            <Listbox value={selected} onChange={setSelected}>
                                <Listbox.Label className="text-xl font-bold mr-5 ml-4">Sort By:</Listbox.Label>
                                <Listbox.Button
                                    className="pl-3 rounded-md text-xl bg-slate-700 text-gray-200 hover:text-gray-200 hover:bg-slate-600 transition duration-300 font-semibold px-4 py-2 z-20"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selected.label}
                                </Listbox.Button>
                                <Transition
                                    show={isOpen}
                                    as={Fragment}
                                    enter="transition-all ease-out duration-400 transform"
                                    enterFrom="opacity-0 -translate-y-10"
                                    enterTo="opacity-50 translate-y-0"
                                    leave="transition-all ease-out duration-400 transform"
                                    leaveFrom="opacity-50 translate-y-0"
                                    leaveTo="opacity-0 -translate-y-10"
                                >
                                    <Listbox.Options className="absolute left-0 w-full z-10 mt-2 bg-zinc-400 border-t-2 border-zinc-500 rounded-bl-lg">
                                        {options.map((option) => (
                                            <Listbox.Option key={option.id} value={option}>
                                                <div
                                                    className={`hover:bg-black hover:text-white rounded-bl-lg transition duration-300 py-2 px-4`}
                                                    onClick={() => handleSort(option)}
                                                >
                                                    {option.label}
                                                </div>
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </Listbox>
                        </div>
                    </div>
                    <div className="flex flex-row-2">
                        <div className='custom-scrollbar items-left flex flex-col overflow-y-scroll h-96 w-3/4 pr-1'>
                            {
                                cartItemList.map((cartItem, i) => {
                                    return (
                                        <div
                                            key={cartItem.cartItemId}
                                            className="rounded-lg ml-5 border-b-2 border-zinc-500 bg-zinc-100 my-1"
                                        >
                                            <div className="m-5 flex">
                                                <img
                                                    src="../src/assets/backgroundMain1.jpg"
                                                    className="w-96 h-64 rounded-lg opacity-90"
                                                ></img>
                                                <div className="pl-5 content-between grid grid-col-2 w-auto">
                                                    <div className="">
                                                        <div className="text-2xl font-bold pb-3">
                                                            <IconContext.Provider value={{ className: "ml-2 mb-1 hover:text-blue-800" }}>
                                                                {cartItem.event.eventName}{" "}<IoMdOpen className='inline-block' />
                                                            </IconContext.Provider>
                                                        </div>
                                                        <div className="text-2xl">
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
                                                        <button onClick={() => updateQuantity(cartItem.cartItemId, (cartItem.quantity - 1))} className="bg-rose-300 border-y-2 border-l-2 border-black text-3xl rounded-l-lg w-12 pb-1">
                                                            -
                                                        </button>
                                                        <div className="p-2 border-2 border-black text-3xl text-center w-20 bg-zinc-200">
                                                            {cartItem.quantity}
                                                        </div>
                                                        <button
                                                            className="bg-emerald-200 border-y-2 border-r-2 border-black text-3xl p-2 rounded-r-lg w-12"
                                                            onClick={() => updateQuantity(cartItem.cartItemId, (cartItem.quantity + 1))}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='text-2xl ml-auto'>
                                                    <IconContext.Provider value={{ className: "text-red-700 hover:text-red-600" }}>
                                                        <button onClick={() => setOpenDeleteItemModal(true)}>
                                                            <FaTrashAlt className='inline-block' />
                                                        </button>
                                                    </IconContext.Provider>
                                                </div>
                                                <Modal
                                                    show={deleteItemModal}
                                                    onClose={() => setOpenDeleteItemModal(false)}
                                                >
                                                    <Modal.Header>
                                                        <div className='pl-60'>
                                                            Item Deletion
                                                        </div>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="text-center">
                                                            <p>
                                                                Do you like to delete this cart item?
                                                            </p>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer className='justify-between'>
                                                        <button
                                                            className='bg-green-400 px-4 py-2 rounded-md'
                                                            onClick={() => deleteItem(cartItem.cartItemId)}>
                                                            Yes
                                                        </button>
                                                        <button
                                                            className='bg-red-400 px-4 py-2 rounded-md'
                                                            onClick={() => setOpenDeleteItemModal(false)}
                                                        >
                                                            No
                                                        </button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className='bg-zinc-100 border-black w-1/4 mx-5 rounded-md justify-between flex flex-col'>
                            <div className='flex flex-col py-2.5 mx-2 items-center'>
                                <div className='border bg-zinc-300 text-center p-2 m-2 rounded-lg w-full justify-center h-64'>
                                    <div className='font-semibold mb-3'>
                                        Cart Summary
                                    </div>
                                    <div className='custom-scrollbar overflow-y-scroll h-48'>
                                        {
                                            cartItemList.map((cartItem, i) => {
                                                return (
                                                    <div
                                                        key={cartItem}
                                                        className="ml-2 bg-white rounded-lg justify-between flex drop-shadow-md py-2 my-1"
                                                    >
                                                        <div className="ml-2">
                                                            <div className="text-left text-lg font-semibold flex">
                                                                {i + 1}.
                                                                <span className="pl-1 text-sky-700">
                                                                    {
                                                                        cartItem
                                                                            .event
                                                                            .eventName
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="text-left">
                                                                Qty:{" "}
                                                                {
                                                                    cartItem.quantity
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="mr-2 text-xl font-bold">
                                                            $
                                                            {cartItem.event
                                                                .eventPrice *
                                                                cartItem.quantity}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-grow'></div>
                            <div className='flex flex-col pb-2.5 items-center'>
                                <div className='font-bold text-2xl'>
                                    {totalString}
                                </div>
                            </div>

                            <button className='font-semibold text-xl bg-orange-400 rounded-md m-2.5 py-2.5 hover:text-white hover:bg-orange-600 transition duration-300'>
                                <Link
                                    to="/checkout">
                                    Proceed to Checkout
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {cartItemList.length === 0 && (
                <div className=''>
                    <div className='text-5xl font-semibold flex items-center justify-center pt-48 pb-10 text-gray-100'>
                        Your Shopping Cart is Currently Empty
                    </div>
                    <div className='text-3xl font-semibold flex w-3/12 justify-center mx-auto mb-48 bg-orange-400 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition duration-300'>
                        <button>
                            <Link
                                to="/eventoverviewuser">
                                Purchase an Event?
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;