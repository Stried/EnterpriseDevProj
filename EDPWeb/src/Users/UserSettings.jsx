import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import *  as yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import http from "../../http";
import { Spinner, Card, Avatar, Button, Modal } from "flowbite-react";
import FileInput from "../component/FileInput";
import ImageCropper from "../component/ImageCropper";

function UserSettings() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [ userAcc, setUserAcc ] = useState("");
    const [ deleteAccountModal, setOpenDeleteAccountModal ] = useState(false);

    // Crop image functions
    const [imageFile, setImageFile] = useState(null);
    const [currentPage, setCurrentPage] = useState("choose-img");
    const [ imgAfterCrop, setImgAfterCrop ] = useState("");
    
    const onImageSelected = (selectedImage) => {
        setImageFile(selectedImage);
        setCurrentPage("crop-img");
    };

    const onCropDone = (imgCroppedArea, e) => {
        const canvasEle = document.createElement("canvas");
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = imageFile;
        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataURL = canvasEle.toDataURL("image/*");

            setImgAfterCrop(dataURL);
            setImageFile(dataURL);
            console.log(imageFile)
            setCurrentPage("img-cropped");
        };
    };

    const onCropCancel = () => {
        setCurrentPage("choose-img");
        setImageFile("");
    };

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
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    const logout = () => {
        if (localStorage.getItem("accessToken")) {
            localStorage.removeItem("accessToken");
            navigate("/");
            window.location.reload();
        }
    };

    const deleteAccount = () => {
        http.delete("/user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                navigate("/")
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
        })
    }

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
                .number("Phone Number must be a valid number.")
                .typeError("Phone Number must be a valid number.")
                .integer("Phone Number must be a valid number.")
                .min(80000000, "Phone Number must be a Singaporean Number.")
                .max(99999999, "Phone Number must be a Singaporean Number.")
                .required("Phone Number is required."),
        }),
        onSubmit: async (data) => {
            if (imageFile) {
                const formData = {
                    Name: (data.Name = data.Name.trim()),
                    Email: (data.Email = data.Email.trim()),
                    PhoneNumber: (data.PhoneNumber = data.PhoneNumber),
                    imageFile: imageFile,
                };
            }

            const formData = {
                Name: (data.Name = data.Name.trim()),
                Email: (data.Email = data.Email.trim()),
                PhoneNumber: (data.PhoneNumber = data.PhoneNumber),
                imageFile: userAcc.imageFile
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

    const formikPassword = useFormik({
        initialValues: {
            Password: "",
            ConfirmPassword: ""
        },
        validationSchema: yup.object().shape({
            Password: yup
                .string()
                .min(8, "Password must be 8 characters long.")
                .max(100, "Password can be at most 100 characters long.")
                .required(),
            ConfirmPassword: yup
                .string()
                .oneOf([ yup.ref('Password'), null ], 'Passwords must match')
                .required()
        }),
        onSubmit: async (data) => {
            await http
                .put("/user/updatePassword", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                })
                .then((res) => {
                    navigate("/account");
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data}`);
                });
        }
    });

    return (
        <div className="">
            {userAcc && (
                <div className="">
                    <h1 className="text-xl font-semibold">
                        Change Account Details
                    </h1>
                    
                    <div className="my-4">
                        {currentPage === "choose-img" ? (
                            <FileInput onImageSelected={onImageSelected} />
                        ) : currentPage === "crop-img" ? (
                            <ImageCropper
                                image={imageFile}
                                onCropDone={onCropDone}
                                onCropCancel={onCropCancel}
                                className="h-40"
                            />
                        ) : (
                            <div className="">
                                <img
                                    src={imgAfterCrop}
                                    className="cropped-img"
                                />

                                <button
                                    onClick={() => {
                                        setCurrentPage("crop-img");
                                    }}
                                    className="px-3 py-2 bg-red-400 mr-2 rounded-md"
                                >
                                    Crop
                                </button>

                                <button
                                    onClick={() => {
                                        setCurrentPage("choose-img");
                                        setImageFile("");
                                    }}
                                    className="px-3 py-2 bg-blue-400 ml-2 rounded-md"
                                >
                                    New Image
                                </button>
                            </div>
                        )}
                    </div>

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
                            Update
                        </button>
                    </form>

                    <hr className="my-10 mx-auto border-2 border-gray-400" />

                    <h1 className="text-xl font-semibold">
                        Change Account Password
                    </h1>
                    <form
                        action=""
                        onSubmit={formikPassword.handleSubmit}
                    >
                        <div className="my-4">
                            <label
                                htmlFor="password"
                                className="font-semibold text-lg"
                            >
                                New Password
                            </label>
                            <p className="opacity-70 italic">
                                Enter your new password below.
                            </p>
                            <input
                                type="text"
                                name="Password"
                                id="Password"
                                onChange={formikPassword.handleChange}
                                value={formikPassword.values.Password}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formikPassword.errors.Password ? (
                                <div className="text-red-400">
                                    *{formikPassword.errors.Password}
                                </div>
                            ) : null}
                        </div>

                        <div className="my-4">
                            <label
                                htmlFor="confirmPassword"
                                className="font-semibold text-lg"
                            >
                                Confirm New Password
                            </label>
                            <p className="opacity-70 italic">
                                Enter your new password below to confirm.
                            </p>
                            <input
                                type="text"
                                name="ConfirmPassword"
                                id="ConfirmPassword"
                                onChange={formikPassword.handleChange}
                                value={formikPassword.values.ConfirmPassword}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formikPassword.errors.ConfirmPassword ? (
                                <div className="text-red-400">
                                    *{formikPassword.errors.ConfirmPassword}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-br from-blue-400 to-violet-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Update
                        </button>
                    </form>

                    <hr className="my-10 mx-auto border-2 border-gray-400" />

                    <h1 className="text-xl font-semibold mb-10">
                        Logout/Account Deletion
                    </h1>
                    <div className="flex">
                        <button
                            onClick={() => logout()}
                            className="bg-red-400 px-4 py-3 rounded-md font-semibold hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Logout
                        </button>
                        <div className="grow"></div>
                        <button
                            onClick={() => setOpenDeleteAccountModal(true)}
                            className="bg-red-400 px-4 py-3 rounded-md font-semibold hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Delete Account
                        </button>
                    </div>
                    <Modal
                        show={deleteAccountModal}
                        onClose={() => setOpenDeleteAccountModal(false)}
                    >
                        <Modal.Header>
                            Account Deletion Confirmation
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                    Once the account is deleted, any information
                                    regarding this account will be permanently
                                    deleted off UPlay's database.
                                </p>
                                <p className="text-base font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                    This action is{" "}
                                    <span className="text-red-400 font-bold">
                                        IRREVERSIBLE.{" "}
                                    </span>
                                    Membership status, points cannot be
                                    regained. Your account will be kicked from
                                    any existing groups.
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => deleteAccount()}>
                                I accept
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setOpenDeleteAccountModal(false)}
                            >
                                Decline
                            </Button>
                        </Modal.Footer>
                    </Modal>
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