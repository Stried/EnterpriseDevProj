import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar";
import { AiOutlineMenu } from "react-icons/ai";

import backgroundMain1 from "./../src/assets/backgroundMain1.jpg"

function App() {
    const [ position, setPosition ] = useState({ x: 0, y: 0 });
    const [ menuClicks, setMenuClicks ] = useState(0);

  const handleMouseMove = (e) => {
    setTimeout(() => {
        setPosition({ x: e.pageX, y: e.pageY });
    }, 100);
  };
    
    return (
        <div className="w-screen min-h-screen h-full bg-gray-100">
            <NavBar />
            <div
                id="content-body"
                className="relative h-screen"
                onMouseMove={handleMouseMove}
            >
                <button
                    style={{
                        left:
                            menuClicks % 5 == 0 && menuClicks != 0
                                ? `${position.x - 15}px`
                                : "20px",
                        top:
                            menuClicks % 5 == 0 && menuClicks != 0
                                ? `${position.y - 100}px`
                                : "550px",
                        position:
                            menuClicks % 5 == 0 && menuClicks != 0
                                ? "absolute"
                                : "fixed"
                    }}
                    className="z-10 w-12 h-12 bg-slate-200 rounded-full absolute"
                    onClick={() => setMenuClicks(menuClicks + 1)}
                >
                    <AiOutlineMenu className="m-auto" />
                </button>
                <div className="relative italic text-gray-100 font-medium text-5xl bg-[url('..\src\assets\backgroundMain1.jpg')] bg-center h-[88vh] bg-cover backdrop-brightness-50">
                    <div className="flex backdrop-brightness-50 w-full h-full">
                        <div className="w-[10%]"></div>
                        <div className="my-auto w-1/3">
                            <p className="">
                                You play. <br />
                                We'll do the rest.
                            </p>
                            <div className="">
                                <button
                                    className="text-xl bg-gradient-to-br from-orange-400 to-red-500 px-3 py-2 rounded-md hover:brightness-90 transition-all duration-300 ease-in-out"
                                >
                                    Book an Activity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-10 px-20">
                    <h1 className="text-center text-3xl font-bold">
                        About UPlay
                    </h1>
                    <h2 className="text-2xl italic font-semibold pt-5">
                        You Play, We'll Do The Rest
                    </h2>
                    <p className="text-xl font-[350]">
                        UPlay, powered by NTUC Club, is a phygital (Physcial +
                        Digital) concierge of curatorial recreational
                        experiences.
                        <br />
                        More than just a booking platform, UPlay aspires to
                        connect people from all walks of life, forging new
                        relationships over time as they find a common thread
                        through shared interests. Union and companies can also
                        join us in creating fun and engaging communities while
                        cultivating deep connections and lifelong relationships.
                    </p>
                </div>
                <div className="py-10 px-20">
                    <div className="grid grid-cols-3 gap-10">
                        <div className="col-span-2 p-4 bg-yellow-200 rounded">
                            <h1 className="text-4xl font-semibold">
                                Plug & Play
                            </h1>
                            <p className="text-xl font-[350] pt-7 w-5/6">
                                UPlay offers over 100 different activities for
                                any occasion.
                                <br />
                                Company Anniversaries, Dinner & Dance, Family
                                Days, let us handle the planning, you simply
                                Plug & Play
                            </p>
                            <button className="mt-4 text-xl bg-red-500 px-3 py-2 rounded-md hover:brightness-90 transition-all duration-300 ease-in-out">
                                Book an Activity
                            </button>
                        </div>
                        <div className="col-span-1 p-4 bg-yellow-200 rounded">
                            <h1 className="text-4xl font-semibold">
                                Venue Partners
                            </h1>
                            <p className="text-xl font-[350] pt-7 w-3/4">
                                UPlay partners with many venues to provide a
                                venue for every activity.
                            </p>
                            <button className="mt-4 text-xl bg-red-500 px-3 py-2 rounded-md hover:brightness-90 transition-all duration-300 ease-in-out">
                                Book an Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
