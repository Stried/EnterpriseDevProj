import { useContext, useEffect, useState } from "react";
import backgroundMain1 from "./../../src/assets/backgroundMain1.jpg";
import http from "../../http";
import UserContext from "../Users/UserContext";
import { Link } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import dayjs from "dayjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VoucherPage() {
    const [ vouchersList, setVouchersList ] = useState([]);
    const [ claimedVouchersList, setClaimedVouchersList ] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getVouchers();
    }, []);

    useEffect(() => {
        getClaimedVouchers()
    }, [])

    const getVouchers = () => {
        http.get("/voucher/VoucherGetAll")
            .then((res) => {
                setVouchersList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    const getClaimedVouchers = () => {
        http.get("voucher/claimedVouchers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setClaimedVouchersList(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    const deleteVoucher = (id) => {
        http.delete(`/deleteVoucher/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.status);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const claimVoucher = (voucherId) => {
        http.post(`/voucher/claimVoucher/${voucherId}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
            .then((res) => {
                console.log(res.status);
                getVouchers();
                getClaimedVouchers();
                toast.info("Voucher has been claimed.")
            })
            .catch(function (err) {
                console.log(err);
                toast.error(`${err.response.data.message}`);
        })
    }

    return (
        <div className="p-10 space-x-4 text-blue-950 bg-gradient-to-br from-gray-800 to-red-700 h-screen">
            <ToastContainer />
            <p className="text-6xl text-gray-200 text-center">Vouchers</p>
            <p className="text-2xl italic text-gray-200 text-center mb-4">
                Looking for discounts? You've come to the right place.
            </p>
            <Tabs
                aria-label="Full width tabs"
                style="fullWidth"
                className="bg-white/30 rounded-md"
            >
                <Tabs.Item
                    active
                    title="Public"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-1 drop-shadow-xl">
                        {vouchersList.map((vouchers, i) => (
                            <div
                                key={i}
                                className="mb-4 flex"
                            >
                                <div
                                    className="ml-5 lg:h-auto lg:w-40 flex-none bg-cover rounded-t lg:rounded-tl 
                                        lg:rounded-bl lg:rounded-tr-none text-center overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${backgroundMain1})`,
                                    }}
                                />
                                <div className="w-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div className="relative mb-8">
                                        {user &&
                                            user.userRole ===
                                                "Administrator" && (
                                                <Link
                                                    to={`/vouchers/updateVouchers/${vouchers.id}`}
                                                    className="absolute top-1 right-1 text-blue-500"
                                                >
                                                    Edit
                                                </Link>
                                            )}
                                        <div className="drop-shadow-md">
                                            <div className="text-gray-900 font-bold text-xl mb-2">
                                                ${vouchers.voucherValue} Voucher
                                            </div>
                                            <p className="text-gray-700 text-base w-64">
                                                {vouchers.voucherName}
                                            </p>
                                            <p>
                                                Expires{" "}
                                                {dayjs(
                                                    vouchers.voucherExpiry
                                                ).format("DD MMM YYYY")}
                                            </p>
                                            <p>Uses: {vouchers.voucherUses}</p>
                                        </div>
                                    </div>
                                    {vouchers.voucherUses != 0 && (
                                        <button
                                            onClick={() =>
                                                claimVoucher(vouchers.id)
                                            }
                                            className="bg-white text-black text-l font-semibold"
                                        >
                                            Claim
                                        </button>
                                    ) }
                                    { vouchers.voucherUses == 0 && (
                                        <div className="">Fully Claimed</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Claimed">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-1 drop-shadow-xl">
                        {claimedVouchersList.map((vouchers, i) => {
                            return (
                                <div
                                    key={i}
                                    className="mb-4 flex"
                                >
                                    <div
                                        className="ml-5 lg:h-auto lg:w-40 flex-none bg-cover rounded-t lg:rounded-tl 
                                        lg:rounded-bl lg:rounded-tr-none text-center overflow-hidden"
                                        style={{
                                            backgroundImage: `url(${backgroundMain1})`,
                                        }}
                                    />
                                    <div className="w-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                        <div className="relative mb-8">
                                            {user &&
                                                user.userRole ===
                                                    "Administrator" && (
                                                    <Link
                                                        to={`/vouchers/updateVouchers/${vouchers.voucher.id}`}
                                                        className="absolute top-1 right-1 text-blue-500"
                                                    >
                                                        Edit
                                                    </Link>
                                                )}
                                            <div className="drop-shadow-md">
                                                <div className="text-gray-900 font-bold text-xl mb-2">
                                                    $
                                                    {
                                                        vouchers.voucher
                                                            .voucherValue
                                                    }{" "}
                                                    Voucher
                                                </div>
                                                <p className="text-gray-700 text-base w-64">
                                                    {
                                                        vouchers.voucher
                                                            .voucherName
                                                    }
                                                </p>
                                                <p>
                                                    Expires{" "}
                                                    {dayjs(
                                                        vouchers.voucherExpiry
                                                    ).format("DD MMM YYYY")}
                                                </p>
                                                <p>
                                                    Uses:{" "}
                                                    {
                                                        vouchers.voucher
                                                            .voucherUses
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Tabs.Item>
            </Tabs>
            <div className="">
                <div className="ml-10 pt-3"></div>
            </div>
        </div>
    );
}

export default VoucherPage;
