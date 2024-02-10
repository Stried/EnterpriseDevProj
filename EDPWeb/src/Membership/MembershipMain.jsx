import { TiTickOutline } from "react-icons/ti";

function MembershipMain() {
    return (
        <div className="">
            <div className="bg-gradient-to-br px-12 py-10 w-screen from-orange-400 to-red-400">
                <h1 className="text-3xl font-bold">Membership</h1>
                <p className="text-lg">
                    Join us today as a member of{" "}
                    <span className="text-xl font-bold">UPLAY</span>
                </p>
            </div>

            <div className="grid grid-cols-3 grid-rows-1 space-x-5 my-6">
                <div className="">
                    <h1 className="text-2xl">Standard</h1>
                    <TiTickOutline className="text-2xl" />
                </div>
            </div>
        </div>
    );
}

export default MembershipMain;
