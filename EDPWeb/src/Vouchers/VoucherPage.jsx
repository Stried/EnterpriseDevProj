import backgroundMain1 from "./../../src/assets/backgroundMain1.jpg";

function VoucherPage() {
    return (
        <div className="p-10 space-x-4">
            <div className="flex">
                <p className="text-6xl">Vouchers</p>
                <div className="ml-10 pt-3">
                    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                        <ul
                            class="flex flex-wrap -mb-px text-sm font-medium text-center"
                            id="default-tab"
                            data-tabs-toggle="#default-tab-content"
                            role="tablist"
                        >
                            <li
                                class="me-2"
                                role="presentation"
                            >
                                <button
                                    class="inline-block p-4 border-b-2 rounded-t-lg"
                                    type="button"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Public
                                </button>
                            </li>
                            <li
                                class="me-2"
                                role="presentation"
                            >
                                <button
                                    class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    type="button"
                                    aria-controls="dashboard"
                                    aria-selected="false"
                                >
                                    Claimed
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="p-10 space-x-4 flex">
                <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4 flex">
                    <div
                        className="ml-5 lg:h-auto lg:w-40 flex-none bg-cover rounded-t
                    lg:rounded-tl lg:rounded-bl lg:rounded-tr-none text-center overflow-hidden"
                        style={{ backgroundImage: `url(${backgroundMain1})` }}
                    />
                    <div className="w-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg
                                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">
                                $5 Voucher
                            </div>
                            <p className="text-gray-700 text-base w-64">
                                Pineapple, Pineapple...
                            </p>
                        </div>
                        <button className="bg-white text-black text-l font-semibold">
                            Claim
                        </button>
                    </div>
                </div>

                <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
                    <div
                        className="ml-5 lg:h-auto lg:w-40 flex-none bg-cover rounded-t
                    lg:rounded-tl lg:rounded-bl lg:rounded-tr-none text-center overflow-hidden"
                        style={{ backgroundImage: `url(${backgroundMain1})` }}
                    />
                    <div className="w-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg
                                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">
                                $10 Voucher
                            </div>
                            <p className="text-gray-700 text-base w-64">
                                Pineapple, Pineapple...
                            </p>
                        </div>
                        <button className="bg-white text-black text-l font-semibold">
                            Claim
                        </button>
                    </div>
                </div>

                <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
                    <div
                        className="ml-5 lg:h-auto lg:w-40 flex-none bg-cover rounded-t
                    lg:rounded-tl lg:rounded-bl lg:rounded-tr-none text-center overflow-hidden"
                        style={{ backgroundImage: `url(${backgroundMain1})` }}
                    />
                    <div className="w-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg
                                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">
                                $15 Voucher
                            </div>
                            <p className="text-gray-700 text-base w-64">
                                Pineapple, Pineapple...
                            </p>
                        </div>
                        <button className="bg-white text-black text-l hover:text-amber-600 transition ease-in-out duration-300 font-semibold">
                            Claim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VoucherPage;
