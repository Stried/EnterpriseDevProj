import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./component/NavBar";
import { AiOutlineMenu } from "react-icons/ai";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import backgroundMain1 from "./../src/assets/backgroundMain1.jpg"
import MainPage from "./component/MainPage";
import Register from "./Users/Register";

function App() {
    const [ position, setPosition ] = useState({ x: 0, y: 0 });
    const [ menuClicks, setMenuClicks ] = useState(0);

  const handleMouseMove = (e) => {
    setTimeout(() => {
        setPosition({ x: e.pageX, y: e.pageY });
    }, 100);
  };
    
    return (
        <div className="w-screen min-h-screen h-full">
            <Router>
                <div className="">
                    <Routes>
                        <Route path="/" element={ <MainPage /> } />
                        <Route path="/register" element={ <Register /> } />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
