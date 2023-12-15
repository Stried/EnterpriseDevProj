import { useContext } from "react";
import UserContext from "./UserContext";
import { Spinner, Card, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

function UserAccount() {
    const { user } = useContext(UserContext);
    
    return (
        <div className="p-5 min-h-[60vh] max-h-full">
            {user && (
                <div className="flex">
                    <div className="w-1/3">
                        <div
                            className="flex bg-white p-5 rounded-lg shadow-md"
                            id="userProfile"
                        >
                            <div className="w-1/3">
                                <Avatar
                                    rounded
                                    size={"lg"}
                                    className=""
                                />
                            </div>
                            <div className="w-2/3">
                                <h1 className="text-3xl font-medium">
                                    {user.name}
                                </h1>
                                <p>{user.email}</p>
                                <p>{user.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 p-10"></div>
                </div>
            )}
            {!user && (
                <div className="">
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default UserAccount;