import { useEffect, useState } from "react";
import http from "../../http";
import { Spinner, Card, Avatar, theme } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function AdminAllUsers() {
    var navigate = useNavigate();
    const [ userList, setUserList ] = useState([]);

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

    return (
        <div className="grid grid-cols-3 px-3 py-4">
            { userList.map((user, i) => {
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
                            <button className="px-2 py-1 bg-blue-300 text-md font-medium rounded" onClick={() => navigate(`/adminPanel/editUser/${user.id}`)}>
                                Edit
                            </button>
                            <button className="px-2 py-1 bg-red-300 text-md font-medium rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default AdminAllUsers;