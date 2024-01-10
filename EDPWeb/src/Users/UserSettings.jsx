import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import *  as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import http from "../../http";
import { Spinner, Card, Avatar } from "flowbite-react";

function UserSettings() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [ userAcc, setUserAcc ] = useState("");

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            http.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`, // This is needed for mine for some reason, not part of the practical
                },
            })
                .then((res) => {
                    setUserAcc(res.data);
                    console.log(userAcc);
                })
                .catch(function (err) {
                    console.log(err);
                    console.log(userAcc);
                });
        }
    }, []);

    const formikAccount = useFormik({
        enableReinitialize: true,
        initialValues: {
            Name: userAcc.name,
            Email: userAcc.email,
            PhoneNumber: userAcc.phoneNumber
        },
        validationSchema: yup.object().shape({
            Name: yup
                .string()
                .trim()
                .min(3, "Minimum 3 characters.")
                .max(50, "Maximum 50 characters.")
                .required(),
            Email: yup
                .string()
                .email("Please enter a valid email account.")
                .required(),
            PhoneNumber: yup
                .number()
                .typeError("Phone Number must be a Singaporean Number.")
                .integer("Phone Number must be a Singaporean Number.")
                .min(80000000, "Phone Number must be a Singaporean Number.")
                .max(99999999, "Phone Number must be a Singaporean Number.")
                .required("Phone Number is required."),
        }),
        onSubmit: async (data) => {
            const formData = {
                Name: (data.Name = data.Name.trim()),
                Email: (data.Email = data.Email.trim()),
                PhoneNumber: (data.PhoneNumber = data.PhoneNumber),
            };

            await http
                .put("/user/updateUser", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    navigate("/account");
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data}`);
                });
        }
    })

    // TODO: Will complete later
    // const formikPassword = useFormik({
    //     initialValues: {
    //         Password: "",
    //     },
    //     validationSchema: yup.object().shape({
    //         Password: yup
    //             .string()
    //             .min(8, "Password must be 8 characters long.")
    //             .max(100, "Password can be at most 100 characters long.")
    //             .required(),
    //     }),
    //     onSubmit: async (data) => {
    //         await http.post
    //     }
    // });

    return (
        <div className="">
            {userAcc && (
                <div className="">
                    <h1 className="text-xl font-semibold">
                        Change Account Details
                    </h1>
                    <form
                        action=""
                        onSubmit={formikAccount.handleSubmit}
                    >
                        <div className="my-4">
                            <label
                                htmlFor="name"
                                className="font-semibold text-lg"
                            >
                                Name
                            </label>
                            <p className="opacity-70 italic">
                                Name as on your NRIC/Birth Certificate
                            </p>
                            <input
                                type="text"
                                name="Name"
                                id="Name"
                                onChange={formikAccount.handleChange}
                                value={formikAccount.values.Name}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formikAccount.errors.Name ? (
                                <div className="text-red-400">
                                    *{formikAccount.errors.Name}
                                </div>
                            ) : null}
                        </div>

                        <div className="my-4">
                            <label
                                htmlFor="Email"
                                className="font-semibold text-lg"
                            >
                                Email Address
                            </label>
                            <p className="opacity-70 italic">
                                Email Address to send receipts and other
                                important information.
                            </p>
                            <input
                                type="email"
                                name="Email"
                                id="Email"
                                onChange={formikAccount.handleChange}
                                value={formikAccount.values.Email}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formikAccount.errors.Email ? (
                                <div className="text-red-400">
                                    *{formikAccount.errors.Email}
                                </div>
                            ) : null}
                        </div>
                        <div className="my-4">
                            <label
                                htmlFor="PhoneNumber"
                                className="font-semibold text-lg"
                            >
                                Phone Number
                            </label>
                            <p className="opacity-70 italic">
                                Phone Number for contacting and relay
                                information. (No landlines.)
                            </p>
                            <input
                                type="number"
                                name="PhoneNumber"
                                id="PhoneNumber"
                                onChange={formikAccount.handleChange}
                                value={formikAccount.values.PhoneNumber}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formikAccount.errors.PhoneNumber ? (
                                <div className="text-red-400">
                                    *{formikAccount.errors.PhoneNumber}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Submit
                        </button>
                    </form>

                    <hr className="my-10 mx-auto border-2 border-gray-400" />

                    <h1 className="text-xl font-semibold">
                        Change Account Password
                    </h1>
                </div>
            )}
            {!userAcc && (
                <div className="w-screen h-screen text-center">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default UserSettings;