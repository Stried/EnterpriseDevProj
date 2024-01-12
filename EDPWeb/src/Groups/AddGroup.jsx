import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddGroup() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            GroupName: ""
        },
        validationSchema: yup.object().shape({
            GroupName: yup.string().min(3).max(25).required()
        }),
        onSubmit: async (data) => {
            await http
                .post("/group/addGroup", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                })
                .then((res) => {
                    console.log(res.status);
                    navigate("/");
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    })

    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 min-h-screen">
            <div className="py-10">
                <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                    <h1 className="text-xl font-medium">Group Creation</h1>
                    <form
                        action=""
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="my-4">
                            <label
                                htmlFor="name"
                                className="font-semibold text-lg"
                            >
                                Group Name
                            </label>
                            <p className="opacity-70 italic">
                                Group name for your group
                            </p>
                            <input
                                type="text"
                                name="GroupName"
                                id="GroupName"
                                onChange={formik.handleChange}
                                value={formik.values.GroupName}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formik.errors.GroupName ? (
                                <div className="text-red-400">
                                    *{formik.errors.GroupName}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Create
                        </button>
                    </form>

                    <hr className="my-10 mx-auto border-2 border-gray-400" />

                    <div className="text-left font-medium">
                        <p>Group Benefits:</p>
                        <p>
                            - Easy to book for big groups (Families, friends, etc)
                        </p>
                        <p>
                            - Group chats for ease of communication
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddGroup;