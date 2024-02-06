import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcJcb } from "react-icons/fa";
import { Link } from "react-router-dom";
import http from "../../http";

function Checkout() {
    const [cartItemList, setCartItemList] = useState([])
    const [voucherList, setVoucherList] = useState([]);

    let subTotal = 0;
    cartItemList.forEach((cartItem) => {
        subTotal = subTotal + (cartItem.event.eventPrice * cartItem.quantity)
    })
    let voucher = 0;

    useEffect(() => {
        http.get("/voucher/VoucherGetAll", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setVoucherList(res.data)
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })

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
    }, [])

    let voucherString;
    let voucherCount = voucherList.length
    if (voucherCount <= 1) {
        voucherString = " voucher is available to use"
    }
    else {
        voucherString = " vouchers are available to use"
    }

    return (
        <div className="bg-gray-200 pb-10 flex flex-col-2 justify-between">
            <div className='pl-20 w-3/4 mr-10'>
                <div className="text-2xl font-extralight p-6">
                    Confirm Purchase
                </div>
                <div className="flex bg-zinc-300 pl-5">
                    <div className="w-1/6 px-2 border-r-2 border-black border-solid my-2 text-lg font-semibold">
                        Payment Methods
                    </div>
                    <div className="w-5/6 my-2 px-3 h-24">
                        <FaCcVisa className="text-8xl inline-block" />
                        <FaCcMastercard className="text-8xl inline-block ml-2" />
                        <FaCcJcb className="text-8xl inline-block ml-2" />
                    </div>
                    <div>
                        <button className="border border-black rounded-lg p-2 mt-2 mr-2 hover:bg-black hover:text-white transition duration-300">
                            <Link
                                to="/">
                                Edit?
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="flex border-y-2 border-gray-400">
                    <div className="w-1/6 text-lg py-10 pl-7 font-semibold">
                        Voucher
                    </div>
                    <div className="text-orange-800 border-2 border-orange-600 my-8 ml-10 px-5 rounded flex flex-row justify-between w-full bg-orange-300 items-center">
                        <div className="inline-block">
                            <span className="font-bold">{voucherCount}</span>{voucherString}
                        </div>
                        <div className="inline-block underline font-semibold">
                            Use a voucher
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-lg my-10 ml-5 pl-2 font-semibold border-black border-l-4">
                        Purchased Items
                    </div>
                    <div className="underline inline-block font-semibold my-9 py-1 px-2 rounded-md bg-orange-400 hover:text-white hover:bg-orange-600 transition duration-300">
                        Edit Purchase?
                    </div>
                </div>
                <div className="custom-scrollbar overflow-y-scroll h-48">
                    {
                        cartItemList.map((cartItem, i) => {
                            return (
                                <div
                                    key={cartItem}
                                    className="ml-7">
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
            <div className="w-1/4 bg-gray-100 rounded-lg border border-gray-300 mt-20 pt-3 px-3 mr-7 flex flex-col">
                <div className="text-2xl p-5 font-semibold text-center">
                    Confirm Purchase
                </div>
                <div className="flex flex-col-2 justify-between w-full text-lg mb-3">
                    <div>Sub Total</div>
                    <div>${subTotal}</div>
                </div>
                <div className="flex flex-col-2 justify-between w-full text-lg mb-3">
                    <div>Use Voucher</div>
                    <div>None</div>
                </div>
                <div className="flex flex-grow"></div>
                <div className="flex flex-col-2 justify-between w-full text-lg mb-3 border-black border-t-2 border-dashed pt-3">
                    <div className="place-self-center">Purchased Items ({cartItemList.length} items)</div>
                    <div className="text-3xl font-semibold text-orange-600">${subTotal - voucher}</div>
                </div>
                <button className="bg-orange-400 font-bold my-3 py-5 rounded-lg text-2xl hover:bg-orange-600 hover:text-white transition duration-300">
                    Finalize Purchase
                </button>
            </div>
        </div>
    )
}

export default Checkout