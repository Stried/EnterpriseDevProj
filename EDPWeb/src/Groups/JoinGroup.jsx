import { useFormik } from "formik";
import * as yup from "yup";
import http from "../../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function JoinGroup() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            groupId: 0
        },
        validationSchema: yup.object().shape({
            groupId: yup.number().required()
        }),
        onSubmit: async (data) => {
            await http
                .post(`/group/joinGroup/${data.groupId}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`, // This is needed for mine for some reason, not part of the practical
                    },
                })
                .then((res) => {
                    console.log(res.status);
                    navigate("/")
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data}`);
            })
        }
    })

    return (
        <div className="bg-gradient-to-br from-orange-400 to-red-500 min-h-screen">
            <ToastContainer />
            <div className="py-10">
                <div className="p-5 text-center bg-stone-100 w-1/2 mx-auto rounded-lg drop-shadow-lg shadow-lg">
                    <h1 className="text-xl font-medium">Joining A Group</h1>

                    <form
                        action=""
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="my-4">
                            <label
                                htmlFor="groupId"
                                className="font-semibold text-lg"
                            >
                                Group ID
                            </label>
                            <p className="opacity-70 italic">
                                Group ID for the group you intend to join
                            </p>
                            <input
                                type="number"
                                name="groupId"
                                id="groupId"
                                onChange={formik.handleChange}
                                value={formik.values.groupId}
                                className="bg-transparent border-gray-800 border-2 rounded w-1/2 px-3 py-2 my-2 focus:outline-none focus:ring focus:ring-red-400"
                            />
                            {formik.errors.groupId ? (
                                <div className="text-red-400">
                                    *{formik.errors.groupId}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md tracking-wide hover:brightness-90 transition ease-in-out duration-300"
                        >
                            Join
                        </button>
                    </form>

                    <hr className="my-10 mx-auto border-2 border-gray-400" />

                    <div className="text-left font-medium">
                        <p>Group Benefits:</p>
                        <p>
                            - Easy to book for big groups (Families, friends,
                            etc)
                        </p>
                        <p>- Group chats for ease of communication</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinGroup;