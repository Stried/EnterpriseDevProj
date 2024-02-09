import { useFormik } from "formik";
import { useState } from "react";

function AddFriends() {
    const [ userCheck, setUserCheck ] = useState("");

    const formik = useFormik({
        initialValues: {
            Email: ""
        },
        
    })

    return (
        <div className="flex space-x-3 m-10">
            <div className="w-1/3">
                <h1 className="text-2xl">Send Friend Request</h1>
                <form action="">Some Form Goes Here</form>
            </div>

            <div className="w-2/3">
                <h1 className="text-2xl">Friend Recommendations</h1>
                <div className="">
                    All Users Here
                </div>
            </div>
        </div>
    );
}

export default AddFriends