import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import http from "../../http";
import { useContext, useState, useEffect } from "react";

function TicketSubmission() {
    const navigate = useNavigate();
    const [ imageFile, setImageFile ] = useState([]);
    const [ userAcc, setUserAcc ] = useState("");

    useEffect(() => {
        http.get(`/user`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setUserAcc(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const onFileChange = (e) => {
        var fileListLength = e.target.files.length;

        var i = 0;
        for (i = 0; i < fileListLength; i++) {
            let file = e.target.files[i];
            if (file) {
                if (file.size > 1024 * 1024) {
                    toast.error("Maximum file size is 1MB");
                    return;
                }
            }

            let formData = new FormData();
            formData.append("formFile", file);
            http.post("/file/uploadTicketImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then((res) => {
                    console.log(res.data);
                    imageFile.push(res.data.fileName);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    };

    const formikTicket = useFormik({
        enableReinitialize: true,
        initialValues: {
            TicketCategory: "",
            TicketHeader: "",
            TicketBody: "",
            SenderEmail: userAcc.email,
            AttachedFilename: "",
        },
        validationSchema: yup.object().shape({
            TicketCategory: yup.string().required(),
            TicketHeader: yup
                .string()
                .trim()
                .min(5, "Ticket Header must be at least 3 characters long.")
                .max(50, "Ticket Header must be at most 50 characters long.")
                .required(),
            TicketBody: yup
                .string()
                .trim()
                .min(5, "Ticket Body must be at least 3 characters.")
                .max(5000, "Ticket Body must be maximum of 5000 characters.")
                .required(),
            SenderEmail: yup.string().email().required(),
        }),
        onSubmit: async (data) => {
            if (imageFile) {
                data.AttachedFilename = imageFile;
            }

            const formData = {
                TicketCategory: data.TicketCategory.trim(),
                TicketHeader: data.TicketHeader.trim(),
                TicketBody: data.TicketBody.trim(),
                SenderEmail: data.SenderEmail.trim(),
                AttachedFilename: imageFile.toString(),
            };

            await http
                .post("/ticket/TicketCreate", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                })
                .then(() => {
                    navigate("/support");
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    });

    return (
        <div className="bg-gradient-to-br from-blue-950 to-red-700 py-10">
            <div className="py-8 rounded container w-1/2 mx-auto text-center text-blue-950 bg-gray-100/40">
                <h1 className="text-3xl font-bold my-8">Ticket Submission</h1>
                <form
                    onSubmit={formikTicket.handleSubmit}
                    className="max-w-md mx-auto"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="TicketCategory"
                            className="block text-sm font-semibold mb-2"
                        >
                            Ticket Category
                        </label>
                        <select
                            id="TicketCategory"
                            name="TicketCategory"
                            onChange={formikTicket.handleChange}
                            onBlur={formikTicket.handleBlur}
                            value={formikTicket.values.TicketCategory}
                            className="form-select w-full rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="Account Issues">
                                Account Issues
                            </option>
                            <option value="Payment Issues">
                                Payment Issues
                            </option>
                            <option value="Activity Issues">
                                Activity Issues
                            </option>
                            <option value="Technical Issues">
                                Technical Issues
                            </option>
                            <option value="Other">Other</option>
                        </select>
                        {formikTicket.touched.TicketCategory &&
                        formikTicket.errors.TicketCategory ? (
                            <div className="text-red-500 text-sm mt-1">
                                {formikTicket.errors.TicketCategory}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="TicketHeader"
                            className="block text-sm font-semibold mb-2"
                        >
                            Ticket Header
                        </label>
                        <input
                            type="text"
                            id="TicketHeader"
                            name="TicketHeader"
                            onChange={formikTicket.handleChange}
                            onBlur={formikTicket.handleBlur}
                            value={formikTicket.values.TicketHeader}
                            className="form-input w-full rounded-md"
                        />
                        {formikTicket.touched.TicketHeader &&
                        formikTicket.errors.TicketHeader ? (
                            <div className="text-red-500 text-sm mt-1">
                                {formikTicket.errors.TicketHeader}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="TicketBody"
                            className="block text-sm font-semibold mb-2"
                        >
                            Ticket Body
                        </label>
                        <textarea
                            id="TicketBody"
                            name="TicketBody"
                            onChange={formikTicket.handleChange}
                            onBlur={formikTicket.handleBlur}
                            value={formikTicket.values.TicketBody}
                            className="form-textarea w-full rounded-md"
                        ></textarea>
                        {formikTicket.touched.TicketBody &&
                        formikTicket.errors.TicketBody ? (
                            <div className="text-red-500 text-sm mt-1">
                                {formikTicket.errors.TicketBody}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="SenderEmail"
                            className="block text-sm font-semibold mb-2"
                        >
                            Want us to contact you using another email? (OPTIONAL)
                        </label>
                        <input
                            type="email"
                            id="SenderEmail"
                            name="SenderEmail"
                            onChange={formikTicket.handleChange}
                            onBlur={formikTicket.handleBlur}
                            value={formikTicket.values.SenderEmail}
                            className="form-input w-full"
                            placeholder="example@mail.com"
                        />
                        {formikTicket.touched.SenderEmail &&
                        formikTicket.errors.SenderEmail ? (
                            <div className="text-red-500 text-sm mt-1">
                                {formikTicket.errors.SenderEmail}
                            </div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="attachments"
                            className="block text-sm font-semibold mb-2"
                        >
                            Attach Files
                        </label>
                        <input
                            type="file"
                            id="attachments"
                            name="attachments"
                            onChange={onFileChange}
                            className="form-input w-full"
                            multiple
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-br from-orange-400 to-red-500 text-blue-950 py-2 px-4 rounded-md hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-600"
                    >
                        Submit Ticket
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TicketSubmission;
