import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AdminEditUser() {
    let { id } = useParams();
    var navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        http.get(`/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                setSelectedUser(res.data);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const formikAccount = useFormik({
        enableReinitialize: true,
        initialValues: {
            Name: selectedUser.name,
            Email: selectedUser.email,
            PhoneNumber: selectedUser.phoneNumber,
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
                .number("Phone Number must be a valid number.")
                .typeError("Phone Number must be a valid number.")
                .integer("Phone Number must be a valid number.")
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
                .put(`/admin/updateUser/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                })
                .then((res) => {
                    navigate("/adminPanel");
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    });

    return (
        <div className="mx-5 my-10">
            <h1 className="text-xl font-medium">Update User Information for {selectedUser.name}</h1>

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
                        Email Address to send receipts and other important
                        information.
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
                        Phone Number for contacting and relay information. (No
                        landlines.)
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
                    Update
                </button>
            </form>
        </div>
    );
}

export default AdminEditUser;
