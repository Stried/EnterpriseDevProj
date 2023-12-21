function MembershipMain() {
    return (
        <div className="mx-12 my-8">
            <div className="bg-gradient-to-br from-orange-400 to-red-400 rounded-xl shadow-lg px-12 py-10">
                <h1 className="text-3xl font-bold text-white">Membership</h1>
                <p className="text-white text-lg">
                    Join us today as a member of{" "}
                    <span className="text-xl font-bold">UPLAY</span>
                </p>
                <div className="grid grid-cols-3 grid-rows-1 space-x-5 my-6">
                    <div className="rounded-xl bg-gradient-to-br from-amber-700 to-yellow-500 bg-opacity-80 px-5 py-3 text-stone-100">
                        <p className="text-xl">
                            Tier{" "}
                            <span className="font-bold text-2xl tracking-wide">
                                Bronze
                            </span>
                        </p>
                        <div
                            className="px-1 py-5"
                            id="tierContent"
                        >
                            <h1 className="text-xl underline">Benefits</h1>
                            <ul>
                                <li>Benefit one</li>
                                <li>Benefit two</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-slate-400 to-gray-300 bg-opacity-80 px-5 py-3 ">
                        <p className="text-xl">
                            Tier{" "}
                            <span className="font-bold text-2xl tracking-wide">
                                Silver
                            </span>
                        </p>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-orange-300 bg-opacity-80 px-5 py-3 text-stone-100">
                        <p className="text-xl">
                            Tier{" "}
                            <span className="font-bold text-2xl tracking-wide">
                                Gold
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipMain;