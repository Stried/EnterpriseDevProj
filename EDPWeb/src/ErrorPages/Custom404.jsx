import { Link, useNavigate } from "react-router-dom";
import cryingFishImage from "../assets/cryingFish.png";
import { useEffect, useState } from "react";

function Custom404() {
    const [ flavourText, setFlavourText ] = useState("");

    useEffect(() => {
        const flavourText = [
            "Lost in the depths of cyberspace, you've stumbled upon a digital abyss.",
            "Wandering the digital corridors, you've inadvertently stepped into the void.",
            "Venturing through the web's labyrinth, you've found yourself at the edge of the abyss.",
            "Navigating the virtual terrain, you've taken a wrong turn and plunged into the abyss.",
            "Exploring the website's maze, you've unwittingly entered the abyss of the unknown.",
            "Traversing the digital wilderness, you've found yourself teetering on the brink of the abyss.",
            "Roaming the vast expanse of the internet, you've stumbled into the depths of the abyss.",
            "Journeying through the tangled web, you've strayed into the abyssal depths.",
            "Lost amidst the digital fog, you've stumbled into the dark abyss.",
            "Navigating the website's labyrinthine corridors, you've fallen into the abyss.",
            "Wandering the digital highways, you've veered off course and into the abyss.",
            "Exploring the depths of the website, you've inadvertently slipped into the abyss.",
            "Adventuring through the virtual realm, you've stumbled upon the gaping abyss.",
            "Roaming the digital landscape, you've unknowingly entered the abyss.",
            "Venturing into the website's unknown corners, you've found yourself at the edge of the abyss.",
            "Lost in the vast expanse of the internet, you've wandered into the abyss.",
            "Exploring the uncharted territories of the web, you've stumbled into the abyss.",
            "Traversing the virtual maze, you've taken a wrong turn and fallen into the abyss.",
            "Wandering the digital wilderness, you've strayed into the depths of the abyss.",
            "Navigating the web's intricate pathways, you've stumbled into the abyss.",
            "Roaming the endless corridors of the website, you've inadvertently stepped into the abyss.",
            "Journeying through the digital realm, you've found yourself lost in the abyss.",
            "Venturing into the website's hidden recesses, you've unknowingly entered the abyss.",
            "Lost amidst the digital chaos, you've fallen into the dark abyss.",
            "Exploring the website's enigmatic depths, you've unwittingly entered the abyss.",
            "Roaming the virtual landscape, you've found yourself at the edge of the abyss.",
            "Navigating the intricate web of links, you've taken a wrong turn and plunged into the abyss.",
            "Wandering the digital frontier, you've strayed into the abyssal depths.",
            "Venturing into the website's forbidden territories, you've stumbled into the abyss.",
            "Journeying through the virtual unknown, you've found yourself lost in the abyss.",
            "Lost in the digital labyrinth, you've unwittingly stepped into the abyss.",
            "Exploring the web's hidden crevices, you've fallen into the abyss.",
            "Roaming the vast digital expanse, you've inadvertently entered the abyss.",
            "Navigating the website's cryptic pathways, you've stumbled into the abyss.",
            "Wandering the virtual realm, you've taken a wrong turn and fallen into the abyss.",
            "Venturing into the depths of the internet, you've strayed into the abyss.",
            "Lost in the tangled web of links, you've found yourself at the edge of the abyss.",
            "Exploring the website's mysterious corners, you've unknowingly entered the abyss.",
            "Roaming the digital wasteland, you've stumbled into the dark abyss.",
            "Navigating the vast digital sea, you've fallen into the abyss.",
            "Journeying through the web's hidden passages, you've inadvertently entered the abyss.",
            "Lost amidst the virtual fog, you've strayed into the depths of the abyss.",
            "Exploring the depths of the internet, you've taken a wrong turn and plunged into the abyss.",
            "Roaming the endless digital highways, you've found yourself lost in the abyss.",
            "Venturing into the web's uncharted territories, you've unwittingly entered the abyss.",
            "Wandering the digital wilderness, you've stumbled into the abyss.",
            "Navigating the labyrinthine pathways of the website, you've fallen into the abyss.",
            "Lost in the vast expanse of cyberspace, you've found yourself at the edge of the abyss.",
            "Exploring the digital unknown, you've strayed into the abyssal depths."
        ];
        
        const randomIndex = Math.floor(Math.random() * flavourText.length);
        const chosenFlavourText = flavourText[randomIndex];

        setFlavourText(chosenFlavourText);
    });

    const navigate = useNavigate();
    return (
        <div className="pt-20 bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100 flex flex-col items-center justify-center w-screen h-[89vh]">
            <p className="text-6xl font-semibold">Whoops!</p>
            <p className="italic">{flavourText}</p>
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
                Error 404: <span className="text-indigo-500 font-medium">Page not found</span>
            </p>
        </div>
    );
}

export default Custom404;
