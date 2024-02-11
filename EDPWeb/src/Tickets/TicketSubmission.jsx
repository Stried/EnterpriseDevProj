import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import *  as yup from "yup";
import http from "../../http";
import { useContext, useState, useEffect } from "react";

function TicketSubmission() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState([]);

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
        initialValues: {
            TicketCategory: "",
            TicketHeader: "",
            TicketBody: "",
            SenderEmail: "",
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
                AttachedFilename: imageFile.toString()
            }

            await http.post("/ticket/TicketCreate", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then(() => {
                    navigate("/support")
                })
                .catch(function (err) {
                    console.log(err);
            })
        },
    });

    return (
        <div className="">
            <h1>Ticket Submission</h1>
            <form
                action=""
                onSubmit={formikTicket.handleSubmit}
            >
                <div className="my-4">
                    <label
                        htmlFor="TicketTitle"
                        className="font-semibold text-lg"
                    >
                        Ticket Category
                    </label>
                    <p className="opacity-70 italic">Category of the ticket.</p>
                    <input
                        name="TicketCategory"
                        id="TicketCategory"
                        onChange={formikTicket.handleChange}
                        value={formikTicket.values.TicketCategory}
                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                    />
                    {formikTicket.errors.TicketCategory ? (
                        <div className="text-red-400">
                            *{formikTicket.errors.TicketCategory}
                        </div>
                    ) : null}
                </div>

                <div className="my-4">
                    <label
                        htmlFor="TicketTitle"
                        className="font-semibold text-lg"
                    >
                        Ticket Header
                    </label>
                    <p className="opacity-70 italic">Title of the ticket.</p>
                    <input
                        name="TicketHeader"
                        id="TicketHeader"
                        onChange={formikTicket.handleChange}
                        value={formikTicket.values.TicketHeader}
                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                    />
                    {formikTicket.errors.TicketHeader ? (
                        <div className="text-red-400">
                            *{formikTicket.errors.TicketHeader}
                        </div>
                    ) : null}
                </div>

                <div className="my-4">
                    <label
                        htmlFor="TicketBody"
                        className="font-semibold text-lg"
                    >
                        Ticket Body
                    </label>
                    <p className="opacity-70 italic">Body of the ticket.</p>
                    <input
                        name="TicketBody"
                        id="TicketBody"
                        onChange={formikTicket.handleChange}
                        value={formikTicket.values.TicketBody}
                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                    />
                    {formikTicket.errors.TicketBody ? (
                        <div className="text-red-400">
                            *{formikTicket.errors.TicketBody}
                        </div>
                    ) : null}
                </div>

                <div className="my-4">
                    <label
                        htmlFor="TicketBody"
                        className="font-semibold text-lg"
                    >
                        Email Address
                    </label>
                    <p className="opacity-70 italic">
                        Email address to reply to/send notifications.
                    </p>
                    <input
                        type="email"
                        name="SenderEmail"
                        id="SenderEmail"
                        onChange={formikTicket.handleChange}
                        value={formikTicket.values.SenderEmail}
                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                    />
                    {formikTicket.errors.SenderEmail ? (
                        <div className="text-red-400">
                            *{formikTicket.errors.SenderEmail}
                        </div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <p>Add an Image</p>
                    <input
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={onFileChange}
                    />
                    {imageFile && (
                        <div className="image-preview">
                            <img
                                src={`${
                                    import.meta.env.VITE_FILE_BASE_URL
                                }${imageFile}`}
                                alt="Uploaded"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                >
                    Submit Ticket
                </button>
            </form>
        </div>
    );
}

export default TicketSubmission;