import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../http";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateVoucher() {
    let { voucherID } = useParams();
    var navigate = useNavigate();
    const [ voucher, setVoucher ] = useState("");

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
            })
        }
    });

    return (
        <div className="">
            <p>Update Vouchers Here</p>
        </div>
    );
}

export default UpdateVoucher;