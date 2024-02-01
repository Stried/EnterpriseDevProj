import { useEffect, useState } from "react";
import http from "../../http";
import { Spinner, Card, Avatar, theme } from "flowbite-react";

function AdminAllUsers() {
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
                    <div className="bg-stone-100 rounded-md px-3 py-2 drop-shadow-lg">
                        <Avatar
                            rounded
                            size={"lg"}
                            className=""
                            img={user.imageFile}
                        />
                        <p className="text-lg font-medium">{user.name}</p>
                        <p className="">{user.email}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default AdminAllUsers;