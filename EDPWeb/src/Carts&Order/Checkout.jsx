import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcJcb } from "react-icons/fa";
import { Link } from "react-router-dom";
import http from "../../http";
import { Button, Modal } from "flowbite-react";

function Checkout() {
    const [cartItemList, setCartItemList] = useState([])
    const [ voucherList, setVoucherList ] = useState([]);
    const [ usedVoucher, setUsedVoucher ] = useState(null);
    const [ vouchersModal, setVouchersModal ] = useState(false);

    let subTotal = 0;
    cartItemList.forEach((cartItem) => {
        subTotal = subTotal + (cartItem.event.eventPrice * cartItem.quantity)
    })
    let voucher = 0;

    useEffect(() => {
        http.get("/voucher/claimedVouchers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setVoucherList(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });

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
        voucherString = " voucher is available to claim and use"
    }
    else {
        voucherString = " vouchers are available to claim and use"
    }

    const selectVoucher = (vouchers) => {
        setUsedVoucher(vouchers);
        subTotal -= vouchers.voucher.voucherValue;
        console.log(subTotal)
    }

    const updateCartSubtotal = (subtotal) => {
        if (usedVoucher) {
            subtotal -= usedVoucher.voucher.voucherValue
        }
        http.post(`/cart/updateCartSubtotal/${subtotal}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log(res.status + "Success in updating subtotal");
            })
            .catch(function (err) {
                console.log(err);
            })
            
        if (usedVoucher) {
            http.post(
                `/cart/updateCartUsedVoucher/${usedVoucher.voucher.id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                }
            )
                .then((res) => {
                    console.log(res.status + "Success in updating voucher ID");
                })
                .catch(function (err) {
                    console.log(err);
            })
        }
    }

    return (
        <div className="bg-gray-200 pb-10 flex flex-col-2 justify-between">
            <div className="pl-20 w-3/4 mr-10">
                <div className="py-10 text-semibold text-3xl">
                    Confirm Purchase
                </div>
                <div className="flex bg-zinc-300 pl-5">
                    <div className="w-1/6 px-2 border-r-2 border-black border-solid my-2 text-lg font-semibold">
                        Payment Options
                    </div>
                    <div className="w-5/6 my-2 px-3 h-24">
                        <FaCcVisa className="text-8xl inline-block" />
                        <FaCcMastercard className="text-8xl inline-block ml-2" />
                        <FaCcJcb className="text-8xl inline-block ml-2" />
                    </div>
                    {/* <div>
                        <button className="border border-black rounded-lg p-2 mt-2 mr-2 hover:bg-black hover:text-white transition duration-300">
                            <Link
                                to="/">
                                Edit?
                            </Link>
                        </button>
                    </div> */}
                </div>
                <div className="flex border-y-2 border-gray-400">
                    <div className="w-1/6 text-lg py-10 pl-7 font-semibold">
                        Voucher
                    </div>
                    <div className="text-orange-800 border-2 border-orange-600 my-8 ml-10 px-5 rounded flex flex-row justify-between w-full bg-orange-300 items-center">
                        <div className="inline-block">
                            <span className="font-bold">{voucherCount}</span>
                            {voucherString}
                        </div>
                        <div
                            onClick={() => setVouchersModal(true)}
                            className="inline-block underline font-semibold"
                        >
                            <button>Use a voucher</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-lg my-10 ml-5 pl-2 font-semibold border-black border-l-4">
                        Purchased Items
                    </div>
                    <button className="underline inline-block font-semibold my-9 py-1 px-2 rounded-md bg-orange-400 hover:text-white hover:bg-orange-600 transition duration-300">
                        <Link to="/myCart">Edit Purchase?</Link>
                    </button>
                </div>
                <div className="custom-scrollbar overflow-y-scroll h-48">
                    {cartItemList.map((cartItem, i) => {
                        return (
                            <div
                                key={cartItem}
                                className="ml-7"
                            >
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
                                        $
                                        {cartItem.event.eventPrice *
                                            cartItem.quantity}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-1/4 bg-gray-100 rounded-lg border border-gray-300 mt-20 pt-3 px-3 mr-7 flex flex-col">
                <div className="text-2xl p-5 font-semibold text-center">
                    Transaction Summary
                </div>
                <div className="flex flex-col-2 justify-between w-full text-lg mb-3">
                    <div>Sub Total</div>
                    <div>${subTotal}</div>
                </div>
                <div className="flex flex-col justify-between w-full text-lg mb-3">
                    <div>Voucher Applied:</div>
                    {usedVoucher == null && <div className="">None</div>}
                    {usedVoucher && (
                        <div className="text-emerald-600">
                            {usedVoucher.voucher.voucherName} ($
                            {usedVoucher.voucher.voucherValue})
                        </div>
                    )}
                </div>
                <div className="flex flex-grow"></div>
                <hr className="border-1 border-gray-800" />
                <div className="flex flex-col-2 justify-between w-full text-lg mb-3 border-black pt-3">
                    <div className="place-self-center">
                        Purchased Items <br /> ({cartItemList.length} items)
                    </div>
                    <div className="text-3xl font-semibold text-orange-600">
                        {usedVoucher && (
                            <p>
                                ${subTotal - usedVoucher.voucher.voucherValue}
                            </p>
                        )}
                        {!usedVoucher && (
                            <p>
                                ${subTotal}
                            </p>
                        )}
                    </div>
                </div>
                <button className="bg-orange-400 font-bold my-3 py-5 rounded-lg text-2xl hover:bg-orange-600 hover:text-white transition duration-300">
                    <Link onClick={() => updateCartSubtotal(subTotal)} to={"/paymentForm"}>Finalize Purchase</Link>
                </button>
            </div>

            {/* Modal for vouchers page */}
            <Modal
                dismissible
                show={vouchersModal}
                onClose={() => setVouchersModal(false)}
            >
                <Modal.Header className="bg-gray-100 h-16 rounded-t-md">
                    Vouchers List
                </Modal.Header>
                <Modal.Body className="bg-gray-200 rounded-b-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-1 drop-shadow-mdspace-y-6 overflow-y-scroll custom-scrollbar">
                        {voucherList.map((vouchers, i) => {
                            return (
                                <div
                                    className="border-2 border-solid border-gray-300 bg-gradient-to-br from-amber-200 to-rose-400 hover:from-rose-400 hover:to-amber-200 px-2 py-2 rounded-md "
                                    key={vouchers.id}
                                >
                                    <h1 className="font-semibold">
                                        {vouchers.voucher.voucherName}
                                    </h1>
                                    <p className="text-emerald-600">
                                        ${vouchers.voucher.voucherValue}
                                    </p>

                                    <button
                                        className="pt-4 text-sky-700"
                                        onClick={() => {
                                            selectVoucher(voucherList[i]);
                                        }}
                                    >
                                        Use Voucher
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Checkout