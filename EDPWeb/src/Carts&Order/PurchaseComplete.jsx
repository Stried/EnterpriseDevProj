import { Link } from "react-router-dom";

function PurchaseComplete() {
    return (
        <div className="bg-gray-200 pt-2 pb-40">
            <div className="text-6xl font-semibold flex justify-center items-center pt-48">
                Purchase Completed
            </div>
            <div className="text-2xl mx-auto flex justify-center text-center font-semibold mt-10">
                Your purchase has been completed
                <br />
                Thank you and have a nice day!
            </div>
            <div className="flex justify-evenly mt-10">
                <div className="bg-orange-400 px-3 py-2 rounded-xl font-semibold text-xl hover:shadow-lg hover:bg-orange-600 hover:text-white transition duration-300">
                    <Link
                        to="/">
                        Return Home
                    </Link>
                </div>
                <div className="bg-orange-400 px-3 py-2 rounded-xl font-semibold text-xl hover:shadow-lg hover:bg-orange-600 hover:text-white transition duration-300">
                    <Link
                        to="/">
                        View Receipt
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PurchaseComplete;