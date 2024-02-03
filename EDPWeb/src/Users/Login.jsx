import { Button, Tabs } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import UserContext from "./UserContext";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const formikIndiv = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema: yup.object().shape({
            Email: yup
                .string()
                .email("Please enter a valid email address.")
                .required(),
            Password: yup.string().required(),
        }),
        onSubmit: async (data) => {
            const formData = {
                Email: (data.Email = data.Email.trim()),
                Password: (data.Password = data.Password.trim()),
            };

            await http
                .post("/user/Login", formData)
                .then((res) => {
                    console.log(res.data.user);
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setUser(res.data.user);
                    navigate("/");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    const formikCorp = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema: yup.object().shape({
            Email: yup
                .string()
                .email("Please enter a valid email address.")
                .required(),
            Password: yup.string().required(),
        }),
        onSubmit: async (data) => {
            const formData = {
                Email: (data.Email = data.Email.trim()),
                Password: (data.Password = data.Password.trim()),
            };

            await http
                .post("/user/Login", formData)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("accessToken", res.data);
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    // Google login
    // https://stackoverflow.com/questions/75590977/get-token-and-google-id-in-react-oauth-google
    // https://stackoverflow.com/questions/76451143/cross-origin-opener-policy-policy-would-block-the-window-postmessage-call-error

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            // error Cross-Origin-Opener-Policy would block the windows.closed call.
            const userInfo = await axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    console.log(res.data);

                    var formData = {
                        Name: res.data.name,
                        Email: res.data.email,
                        Picture: res.data.picture,
                    };

                    http.post("/user/googleLogin", formData)
                        .then((res) => {
                            console.log(formData);
                            localStorage.setItem("googleAccessToken", res.data);
                            navigate("/");
                        })  
                        .catch(function (err) {
                            console.log(err);
                        });
                })
                .catch(function (err) {
                    console.log(err);
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
                    className="py-0 h-screen"
                >
                    <div className="bg-gradient-to-br from-orange-400 to-red-500 py-10">
                        <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                            <h1 className="text-xl font-medium">
                                Individual Account Login
                            </h1>
                            <form
                                onSubmit={formikIndiv.handleSubmit}
                                className="text-lg font-medium"
                            >
                                <div className="my-4">
                                    <label htmlFor="name">Email Address</label>
                                    <p className="opacity-70 italic">
                                        Account's Email Address
                                    </p>
                                    <input
                                        type="text"
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
                                    <label htmlFor="name">Password</label>
                                    <p className="opacity-70 italic">
                                        Account's Password
                                    </p>
                                    <input
                                        type="text"
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
                            </form>

                            <div className="py-5">
                                <p>
                                    Do not have an account?{" "}
                                    <a
                                        href="/register"
                                        className="text-blue-600 visited:text-purple-600"
                                    >
                                        Sign Up
                                    </a>
                                </p>

                                <p>
                                    Forgot Password?{" "}
                                    <a
                                        href="/"
                                        className="text-blue-600 visited:text-purple-600"
                                    >
                                        Reset Now
                                    </a>
                                </p>
                            </div>

                            <hr className="my-10 mx-auto border-2 border-gray-400" />
                            <div className="my-3 flex flex-col">
                                <p className="mb-4 text-xl font-semibold">
                                    Sign in with Socials?
                                </p>
                                <button
                                    onClick={() => googleLogin()}
                                    className="px-3 py-2 bg-orange-400 w-1/4 mx-auto rounded font-medium drop-shadow-md"
                                >
                                    Login With Google
                                </button>
                            </div>
                            <hr className="my-10 mx-auto border-2 border-gray-400" />
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
                                Corporate Account Login
                            </h1>
                            <form
                                onSubmit={formikCorp.handleSubmit}
                                className="text-lg font-medium"
                            >
                                <div className="my-4">
                                    <label htmlFor="name">Email Address</label>
                                    <p className="opacity-70 italic">
                                        Account's Email Address
                                    </p>
                                    <input
                                        type="text"
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
                                    <label htmlFor="name">Password</label>
                                    <p className="opacity-70 italic">
                                        Account's Password
                                    </p>
                                    <input
                                        type="text"
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

                            <div className="py-5">
                                <p>
                                    Do not have an account?{" "}
                                    <a
                                        href="/register"
                                        className="text-blue-600 visited:text-purple-600"
                                    >
                                        Sign Up
                                    </a>
                                </p>

                                <p>
                                    Forgot Password?{" "}
                                    <a
                                        href="/"
                                        className="text-blue-600 visited:text-purple-600"
                                    >
                                        Reset Now
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Tabs.Item>
            </Tabs>
        </div>
    );
}

export default Login;