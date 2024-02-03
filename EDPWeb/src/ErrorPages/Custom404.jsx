import { Link } from "react-router-dom";

function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-[55vh]">
            <p className="text-6xl font-semibold">Err. 404</p>
            <p>It seems like the page you are looking for is not found.</p>
            <div className="mt-10">
                <p className="text-xl">
                    Return to <Link to={"/"} className="text-blue-500 font-semibold">Home</Link>
                </p>
            </div>
        </div>
    );
}

export default Custom404;
