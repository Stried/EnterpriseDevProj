import { Link, useNavigate } from "react-router-dom";
import cryingFishImage from "../assets/cryingFish.png";

function Custom404() {
    const navigate = useNavigate();
    return (
        <div className="mt-20 flex flex-col items-center justify-center w-screen">
            <p className="text-6xl font-semibold">Whoops!</p>
            <p className="pt-5">
                It seems like the page you are looking has been moved, or
                replaced.
            </p>
            <div>
                <img
                    onClick={() => navigate("/")}
                    className="cursor-pointer"
                    src={cryingFishImage}
                    alt="Andy"
                />
            </div>
            <p>
                Console the fish or click{" "}
                <Link
                    to={"/"}
                    className="text-blue-500 font-semibold"
                >
                    here
                </Link>{" "}
                to return home.
            </p>
            <p className="pt-40 font-extralight">
                Error 404: <span className="text-rose-500 font-medium">Page not found</span>
            </p>
        </div>
    );
}

export default Custom404;
