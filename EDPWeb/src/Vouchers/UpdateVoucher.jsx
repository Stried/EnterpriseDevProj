import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateVoucher() {
    let { voucherID } = useParams();
    var navigate = useNavigate();
    const [voucher, setVoucher] = useState("");

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            VoucherName: voucher.VoucherName,
            VoucherValue: voucher.VoucherValue,
            VoucherUses: voucher.VoucherUses,
            VoucherExpiry: voucher.VoucherExpiry,
        },
        validationSchema: yup.object().shape({
            VoucherName: yup
                .string()
                .trim()
                .min(5, "Minimum of 5 words")
                .max(30, "Maximum of 30 characters")
                .required(),
            VoucherValue: yup
                .number()
                .typeError()
                .integer()
                .min(5)
                .max(100)
                .required(),
            VoucherUses: yup
                .number()
                .typeError()
                .integer()
                .min(5)
                .max(10000)
                .required(),
            VoucherExpiry: yup
                .string()
                .trim()
                .min(5, "Minimum of 5 words")
                .max(30, "Maximum of 30 characters")
                .required(),
        }),
        onSubmit: async (data) => {
            const formData = {
                VoucherName: (data.VoucherName = data.VoucherName.Trim()),
                VoucherValue: data.VoucherValue,
                VoucherUses: data.VoucherUses,
                VoucherExpiry: (data.VoucherExpiry = data.VoucherExpiry.Trim()),
            };

            http.put(`/voucher/${voucherID}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`, // This is needed for mine for some reason, not part of the practical
                }, // Well, it should be part of the practicals. Practically, it makes sense. Pragmatically, it doesn't.
                // To be or not to be? That is the question.
            })
                .then((res) => {
                    navigate("/vouchers");
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    });

    return (
        <div className="grid text-center mt-5">
            <h1 className="text-5xl">Voucher Update Page</h1>
            <p className="italic mb-5">
                Messed up somewhere? You can change its details here.
            </p>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-5 rounded-md container mx-auto w-1/3 bg-stone-200">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Voucher Name */}
                        <div className="text-left col-span-1">
                            <label
                                htmlFor="VoucherName"
                                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
                            >
                                Voucher Name
                            </label>
                            <input
                                id="VoucherName"
                                type="text"
                                placeholder="Enter Voucher Name"
                                onChange={formik.handleChange}
                                value={formik.values.VoucherName}
                                className="block w-full border-1 rounded-md bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.VoucherName ? (
                                <div className="text-red-400">
                                    *{formik.errors.VoucherName}
                                </div>
                            ) : null}
                        </div>

                        {/* Voucher Value */}
                        <div className="text-left col-span-1">
                            <label
                                htmlFor="VoucherValue"
                                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
                            >
                                Voucher Value($)
                            </label>
                            <input
                                id="VoucherValue"
                                type="number"
                                placeholder="Enter Voucher Value"
                                onChange={formik.handleChange}
                                value={formik.values.VoucherValue}
                                className="block w-full border-1 rounded-md bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.VoucherValue ? (
                                <div className="text-red-400">
                                    *{formik.errors.VoucherValue}
                                </div>
                            ) : null}
                        </div>

                        {/* Voucher Uses */}
                        <div className="text-left col-span-1 mt-4">
                            <label
                                htmlFor="VoucherUses"
                                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
                            >
                                Voucher Uses
                            </label>
                            <input
                                id="VoucherUses"
                                type="number"
                                placeholder="Enter Voucher Uses"
                                onChange={formik.handleChange}
                                value={formik.values.VoucherUses}
                                className="block w-full border-1 rounded-md bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.VoucherUses ? (
                                <div className="text-red-400">
                                    *{formik.errors.VoucherUses}
                                </div>
                            ) : null}
                        </div>

                        {/* Voucher Expiry */}
                        <div className="text-left col-span-1 mt-4">
                            <label
                                htmlFor="VoucherExpiry"
                                className="pl-1 block text-sm font-medium leading-6 text-gray-900"
                            >
                                Voucher Expiry
                            </label>
                            <input
                                id="VoucherExpiry"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.VoucherExpiry}
                                className="block w-full border-1 rounded-md bg-transparent py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            {formik.errors.VoucherExpiry ? (
                                <div className="text-red-400">
                                    *{formik.errors.VoucherExpiry}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <button
                        id="VoucherCreationSubmitButton"
                        type="submit"
                        className="mt-6 bg-blue-500 py-2 px-4 rounded-md text-white"
                    >
                        Looks good
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateVoucher;
