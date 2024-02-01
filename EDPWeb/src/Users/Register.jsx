import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import FileInput from "../component/FileInput";
import ImageCropper from "../component/ImageCropper";

function Register() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [currentPage, setCurrentPage] = useState("choose-img");
    const [imgAfterCrop, setImgAfterCrop] = useState("");

    const onFileChange = (e) => {
        let file = imgAfterCrop;

        let formData = new FormData();
        formData.append("file", file);
        http.post("/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                setImageFile(res.data.fileName);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const onImageSelected = (selectedImage) => {
        setImageFile(selectedImage);
        setCurrentPage("crop-img");
    };

    const onCropDone = (imgCroppedArea) => {
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

            const dataURL = canvasEle.toDataURL("image/jpeg");

            setImgAfterCrop(dataURL);
            setCurrentPage("img-cropped");
        };
    };

    const onCropCancel = () => {
        setCurrentPage("choose-img");
        setImageFile("");
    };

    const formikIndiv = useFormik({
        initialValues: {
            Name: "",
            NRIC: "",
            Email: "",
            PhoneNumber: 0,
            Password: "",
            UserRole: "User",
        },
        validationSchema: yup.object().shape({
            Name: yup
                .string()
                .trim()
                .min(3, "Minimum 3 characters.")
                .max(50, "Maximum 50 characters.")
                .required(),
            NRIC: yup
                .string()
                .trim()
                .test(
                    "len",
                    "NRIC must be 9 characters only.",
                    (v) => v.length == 9
                ),
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
            Password: yup
                .string()
                .min(8, "Password must be 8 characters long.")
                .max(100, "Password can be at most 100 characters long.")
                .required(),
        }),
        onSubmit: async (data) => {
            if (imageFile) {
                data.imageFile = imageFile;
            }

            const formData = {
                Name: (data.Name = data.Name.trim()),
                NRIC: (data.NRIC = data.NRIC.trim()),
                Email: (data.Email = data.Email.trim()),
                PhoneNumber: (data.PhoneNumber = data.PhoneNumber),
                Password: (data.Password = data.Password.trim()),
                imageFile: data.imageFile,
                UserRole: "User",
            };

            await http
                .post("/user/Register", formData)
                .then((res) => {
                    console.log(res.data); //TODO: Remove b4 presentation
                    navigate("/login");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data}`);
                });
        },
    });

    const formikCorp = useFormik({
        initialValues: {
            Name: "",
            NRIC: "",
            Email: "",
            PhoneNumber: 0,
            Password: "",
            UserRole: "Corporate",
        },
        validationSchema: yup.object().shape({
            Name: yup
                .string()
                .trim()
                .min(3, "Minimum 3 characters.")
                .max(50, "Maximum 50 characters.")
                .required(),
            NRIC: yup
                .string()
                .trim()
                .test(
                    "len",
                    "NRIC must be 9 characters only.",
                    (v) => v.length == 9
                ),
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
            Password: yup
                .string()
                .min(8, "Password must be 8 characters long.")
                .max(100, "Password can be at most 100 characters long.")
                .required(),
        }),
        onSubmit: async (data) => {
            const formData = {
                Name: (data.Name = data.Name.trim()),
                NRIC: (data.NRIC = data.NRIC.trim()),
                Email: (data.Email = data.Email.trim()),
                PhoneNumber: (data.PhoneNumber = data.PhoneNumber),
                Password: (data.Password = data.Password.trim()),
                UserRole: "Corporate",
            };

            await http
                .post("/user/Register", formData)
                .then((res) => {
                    console.log(res.data); //TODO: Remove b4 presentation
                    navigate("/login");
                })
                .catch(function (err) {
                    console.log(formData);
                    console.log(err);
                    toast.error(`${err.response.data}`); // For when return BadRequest(message)
                });
        },
    });

    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500">
            <ToastContainer />
            <Tabs
                style="fullWidth"
                className="gap-0 py-0 my-0"
            >
                <Tabs.Item
                    active
                    title="Individual"
                    icon={AiOutlineUser}
                    className="py-0"
                >
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
                        <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                            <h1 className="text-xl font-medium">
                                Individual Account Registration
                            </h1>
                            <form
                                onSubmit={formikIndiv.handleSubmit}
                                className="text-lg font-medium"
                            >
                                <div className="my-4">
                                    <label htmlFor="name">Name</label>
                                    <p className="opacity-70 italic">
                                        Name as on your NRIC/Birth Certificate
                                    </p>
                                    <input
                                        type="text"
                                        name="Name"
                                        id="Name"
                                        onChange={formikIndiv.handleChange}
                                        value={formikIndiv.values.Name}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikIndiv.errors.Name ? (
                                        <div className="text-red-400">
                                            *{formikIndiv.errors.Name}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="NRIC">NRIC</label>
                                    <p className="opacity-70 italic">
                                        National Registration Identity Card
                                        (NRIC) Number
                                    </p>
                                    <input
                                        type="text"
                                        name="NRIC"
                                        id="NRIC"
                                        onChange={formikIndiv.handleChange}
                                        value={formikIndiv.values.NRIC}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikIndiv.errors.NRIC ? (
                                        <div className="text-red-400">
                                            *{formikIndiv.errors.NRIC}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="Email">Email Address</label>
                                    <p className="opacity-70 italic">
                                        Email Address to send receipts and other
                                        important information.
                                    </p>
                                    <input
                                        type="email"
                                        name="Email"
                                        id="Email"
                                        onChange={formikIndiv.handleChange}
                                        value={formikIndiv.values.Email}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikIndiv.errors.Email ? (
                                        <div className="text-red-400">
                                            *{formikIndiv.errors.Email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="PhoneNumber">
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
                                        onChange={formikIndiv.handleChange}
                                        value={formikIndiv.values.PhoneNumber}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikIndiv.errors.PhoneNumber ? (
                                        <div className="text-red-400">
                                            *{formikIndiv.errors.PhoneNumber}
                                        </div>
                                    ) : null}
                                </div>
                                {/* <div className="my-4">
                                    <label htmlFor="PhoneNumber">
                                        Profile Image
                                    </label>
                                    <p className="opacity-70 italic">
                                        Image used for your profile picture.
                                    </p>
                                    <input
                                        className=""
                                        accept="image/*"
                                        type="file"
                                        onChange={onFileChange}
                                    />
                                    {imageFile && (
                                        <div className="image-preview">
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_FILE_BASE_URL
                                                }${imageFile}`}
                                                alt="Uploaded"
                                            />
                                        </div>
                                    )}
                                </div> */}

                                {currentPage === "choose-img" ? (
                                    <FileInput
                                        onImageSelected={onImageSelected}
                                    />
                                ) : currentPage === "crop-img" ? (
                                    <ImageCropper
                                        image={imageFile}
                                        onCropDone={onCropDone}
                                        onCropCancel={onCropCancel}
                                        className="w-screen h-screen"
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
                                                    } }
                                                    className="px-3 py-2 bg-red-400 mr-2 rounded-md"
                                        >
                                            Crop
                                        </button>

                                        <button
                                            onClick={() => {
                                                setCurrentPage("choose-img");
                                                setImageFile("");
                                                    } }
                                                    className="px-3 py-2 bg-blue-400 ml-2 rounded-md"
                                        >
                                            New Image
                                        </button>
                                    </div>
                                )}

                                <div className="my-4">
                                    <label htmlFor="Password">Password</label>
                                    <p className="opacity-70 italic">
                                        Account Password. (8 - 100 characters)
                                    </p>
                                    <input
                                        type="password"
                                        name="Password"
                                        id="Password"
                                        onChange={formikIndiv.handleChange}
                                        value={formikIndiv.values.Password}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikIndiv.errors.Password ? (
                                        <div className="text-red-400">
                                            *{formikIndiv.errors.Password}
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                                >
                                    Submit
                                </button>
                                <div className="py-5">
                                    <p>
                                        Already have an account?{" "}
                                        <a
                                            href="/register"
                                            className="text-blue-600 visited:text-purple-600"
                                        >
                                            Log In
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    title="Corporate"
                    icon={GrGroup}
                    className="py-0"
                >
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
                        <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                            <h1 className="text-xl font-medium">
                                Corporate Account Registration
                            </h1>
                            <form
                                onSubmit={formikCorp.handleSubmit}
                                className="text-lg font-medium"
                            >
                                <div className="my-4">
                                    <label htmlFor="name">Name</label>
                                    <p className="opacity-70 italic">
                                        Representative's Name
                                    </p>
                                    <input
                                        type="text"
                                        name="Name"
                                        id="Name"
                                        onChange={formikCorp.handleChange}
                                        value={formikCorp.values.Name}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikCorp.errors.Name ? (
                                        <div className="text-red-400">
                                            *{formikCorp.errors.Name}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="NRIC">NRIC</label>
                                    <p className="opacity-70 italic">
                                        Representative's NRIC Number
                                    </p>
                                    <input
                                        type="text"
                                        name="NRIC"
                                        id="NRIC"
                                        onChange={formikCorp.handleChange}
                                        value={formikCorp.values.NRIC}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikCorp.errors.NRIC ? (
                                        <div className="text-red-400">
                                            *{formikCorp.errors.NRIC}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="Email">Email Address</label>
                                    <p className="opacity-70 italic">
                                        Representive's/Company's Email Address
                                    </p>
                                    <input
                                        type="email"
                                        name="Email"
                                        id="Email"
                                        onChange={formikCorp.handleChange}
                                        value={formikCorp.values.Email}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikCorp.errors.Email ? (
                                        <div className="text-red-400">
                                            *{formikCorp.errors.Email}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="PhoneNumber">
                                        Phone Number
                                    </label>
                                    <p className="opacity-70 italic">
                                        Representative's/Company's Phone Number
                                        (No landlines.)
                                    </p>
                                    <input
                                        type="number"
                                        name="PhoneNumber"
                                        id="PhoneNumber"
                                        onChange={formikCorp.handleChange}
                                        value={formikCorp.values.PhoneNumber}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikCorp.errors.PhoneNumber ? (
                                        <div className="text-red-400">
                                            *{formikCorp.errors.PhoneNumber}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="my-4">
                                    <label htmlFor="Password">Password</label>
                                    <p className="opacity-70 italic">
                                        Account Password. (8 - 100 characters)
                                    </p>
                                    <input
                                        type="password"
                                        name="Password"
                                        id="Password"
                                        onChange={formikCorp.handleChange}
                                        value={formikCorp.values.Password}
                                        className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                                    />
                                    {formikCorp.errors.Password ? (
                                        <div className="text-red-400">
                                            *{formikCorp.errors.Password}
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
                        </div>
                    </div>
                </Tabs.Item>
            </Tabs>
        </div>
    );
}

export default Register;
