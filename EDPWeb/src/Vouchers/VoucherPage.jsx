import { useContext, useEffect, useState } from "react";
import backgroundMain1 from "./../../src/assets/backgroundMain1.jpg";
import http from "../../http";
import UserContext from "../Users/UserContext";
import { Link } from "react-router-dom";

function VoucherPage() {
    const [vouchersList, setVouchersList] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        http.get("/voucher/VoucherGetAll")
            .then((res) => {
                setVouchersList(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

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

    return (
        <div className="p-10 space-x-4">
            <div className="flex">
                <p className="text-6xl">Vouchers</p>
                <div className="ml-10 pt-3">
                    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul
                            class="flex flex-wrap -mb-px text-sm font-medium text-center"
                            id="default-tab"
                            data-tabs-toggle="#default-tab-content"
                            role="tablist"
                        >
                            <li
                                class="me-2"
                                role="presentation"
                            >
                                <button
                                    class="inline-block p-4 border-b-2 rounded-t-lg"
                                    type="button"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Public
                                </button>
                            </li>
                            <li
                                class="me-2"
                                role="presentation"
                            >
                                <button
                                    class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    type="button"
                                    aria-controls="dashboard"
                                    aria-selected="false"
                                >
                                    Claimed
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                                {user && user.userRole === "Administrator" && (
                                    <Link
                                        to={`/vouchers/updateVouchers/${vouchers.id}`}
                                        className="absolute top-1 right-1 text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                )}
                                <div className="text-gray-900 font-bold text-xl mb-2">
                                    ${vouchers.voucherValue} Voucher
                                </div>
                                <p className="text-gray-700 text-base w-64">
                                    {vouchers.voucherName}
                                </p>
                                <p>Expiry Date: {vouchers.voucherExpiry}</p>
                                <p>Uses: {vouchers.voucherUses}</p>
                            </div>
                            <button className="bg-white text-black text-l font-semibold">
                                Claim
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VoucherPage;
