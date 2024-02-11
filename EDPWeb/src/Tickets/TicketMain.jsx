import { FaPhone, FaEnvelope } from 'react-icons/fa';

function TicketMain() {
    return (
        <div className="bg-gray-900 py-20 text-center">
            <h1 className="text-5xl text-amber-400">Got a problem?🍍</h1>
            <h3 className="text-2xl text-slate-200 mt-4">
                We're here for you.
            </h3>
            <p className="text-white mt-8">
                Contact our line of dedicated employees who are ready to assist
                you.
            </p>
            
            <div className="text-slate-200 mt-8">
                <h3 className="text-2xl mt-4">
                    Week<span className="text-amber-400">DAYS</span>
                </h3>
                <p>9am - 6pm</p>

                <h3 className="text-2xl">
                    Week<span className="text-cyan-400">ENDS</span>
                </h3>
                <p>9am - 5pm</p>
            </div>
            <div className="text-slate-200 flex justify-center mt-8">
                <div className="mr-4">
                    <button className="bg-amber-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-amber-500 transition duration-300">
                        <FaPhone className="inline-block mr-2" /> +65 9123 4567
                    </button>
                </div>
                <div>
                    <button className="bg-amber-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-amber-500 transition duration-300">
                        <FaEnvelope className="inline-block mr-2" /> support@uplay.sg
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <button className="bg-amber-400 text-gray-900 px-8 py-2 rounded-lg hover:bg-amber-500 transition duration-300">
                    Submit a ticket
                </button>
            </div>
        </div>
    );
}

export default TicketMain;
