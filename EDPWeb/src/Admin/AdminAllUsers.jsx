import { useEffect, useState } from "react";
import http from "../../http";
import { Spinner, Card, Avatar, theme, Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function AdminAllUsers() {
    var navigate = useNavigate();
    const [ userList, setUserList ] = useState([]);
    const [ openModal, setOpenModal ] = useState("");

    useEffect(() => {
        http.get("/admin/getAllUsers", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then((res) => {
                setUserList(res.data);
                console.log(res.data)
            })
            .catch(function (err) {
                console.log(err);
        })
    }, [])

    const deleteAccount = (userID) => {
        http.delete(`/admin/deleteUser/${userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // This is needed for mine for some reason, not part of the practical
            },
        })
            .then((res) => {
                console.log("Account deleted");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    return (
        <div className="grid grid-cols-3 px-3 py-4">
            { userList.map((user, i) => {
                const isModalOpen = openModal === user.id;
                return (
                    <div className="bg-stone-100 rounded-md px-3 py-2 drop-shadow-lg mr-3 mb-3">
                        <Avatar
                            rounded
                            size={"lg"}
                            className=""
                            img={user.imageFile}
                        />
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="">{user.email}</p>

                        <div className="pt-4 space-x-2">
                            <button
                                className="px-2 py-1 bg-blue-300 text-md font-medium rounded"
                                onClick={() =>
                                    navigate(`/adminPanel/editUser/${user.id}`)
                                }
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setOpenModal(user.id)}
                                className="px-2 py-1 bg-red-300 text-md font-medium rounded"
                            >
                                Delete
                            </button>
                        </div>

                        <Modal
                            dismissible
                            show={isModalOpen}
                            onClose={() => setOpenModal("")}
                        >
                            <Modal.Header>
                                Deletion of {user.name}'s Account
                            </Modal.Header>
                            <Modal.Body>
                                <div className="space-y-6">
                                    <p className="text-base font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                        Once the account is deleted, any
                                        information regarding this account will
                                        be permanently deleted off UPlay's
                                        database.
                                    </p>
                                    <p className="text-base font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                                        This action is{" "}
                                        <span className="text-red-400 font-bold">
                                            IRREVERSIBLE.{" "}
                                        </span>
                                        Membership status, points cannot be
                                        regained. Your account will be kicked
                                        from any existing groups.
                                    </p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => deleteAccount(user.id)}>
                                    I accept
                                </Button>
                                <Button
                                    color="gray"
                                    onClick={() =>
                                        setOpenModal("")
                                    }
                                >
                                    Decline
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                );
            })}
        </div>
    )
}

export default AdminAllUsers;