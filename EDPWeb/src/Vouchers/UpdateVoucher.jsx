import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "flowbite-react";

function UpdateVoucher() {
    let { voucherID } = useParams();
    var navigate = useNavigate();
    const [ voucher, setVoucher ] = useState("");
    const [openDeleteModal, setOpenModal] = useState(false);

    const deleteVoucher = () => {
        http.delete(`voucher/deleteVoucher/${voucherID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.status);
                navigate("/vouchers")
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        http.get(`/voucher/VoucherGetOne/${voucherID}`)
            .then((res) => {
                setVoucher(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            VoucherName: voucher.voucherName,
            VoucherValue: voucher.voucherValue,
            VoucherUses: voucher.voucherUses,
            VoucherExpiry: voucher.voucherExpiry,
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
                VoucherName: (data.VoucherName = data.VoucherName.trim()),
                VoucherValue: data.VoucherValue,
                VoucherUses: data.VoucherUses,
                VoucherExpiry: (data.VoucherExpiry = data.VoucherExpiry.trim()),
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
        <div className="">
            {voucher && (
                <div className="grid text-center mt-5">
                    <h1 className="text-5xl">Voucher Update Page</h1>
                    <p className="italic mb-5">
                        Messed up somewhere? You can change its details here.
                    </p>
                    <div className="bg-stone-200 w-1/3 mx-auto rounded-md py-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="px-5 py-1 container mx-auto">
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
                                    id="VoucherUpdateSubmitButton"
                                    type="submit"
                                    className="mx-5 mt-6 bg-blue-500 py-2 px-4 rounded-md text-white"
                                >
                                    Looks good
                                </button>
                            </div>
                        </form>
                        <button
                            id="VoucherDeleteButton"
                            className="mt-2 w-1/4 bg-red-500 py-2 px-4 rounded-md text-white"
                            onClick={() => setOpenModal(true)}
                        >
                            Delete
                        </button>
                    </div>
                    <Modal
                        show={openDeleteModal}
                        onClose={() => setOpenModal(false)}
                    >
                        <Modal.Header>Terms of Service</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    voucher? This action is IRREVERSIBLE!
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => deleteVoucher()}>
                                Confirm
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Maybe not
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
            {!voucher && <div className="">Getting Page</div>}
        </div>
    );
}

export default UpdateVoucher;
