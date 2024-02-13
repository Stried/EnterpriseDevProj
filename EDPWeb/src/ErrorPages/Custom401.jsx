import { Link, useNavigate } from "react-router-dom";
import waguri from "../assets/waguriKaoruko.png";
import { useEffect, useState } from "react";



function Custom401() {
    const [flavourText, setFlavourText] = useState("")

    useEffect(() => {
        const flavourText = [
            "Ahoy there! This is not the port you're looking for. Need a compass to navigate back?",
            "Hello, wanderer! You've strayed from the beaten path. Need a guide to lead you home?",
            "Greetings, traveler! This area is off-limits to unauthorized visitors. Need assistance finding the exit?",
            "Well, well, well... What do we have here? Unauthorized access detected. Care to state your business?",
            "Hold it right there! Access denied. You'll need proper credentials to proceed.",
            "Oopsie daisy! Looks like you took a detour. Need help finding your way back?",
            "Hey, hey, hey! Unauthorized entry detected. Need help retracing your steps?",
            "Whoa! You're in the wrong neighborhood, friend. Need a hand getting back to safety?",
            "Attention, intruder! You're in restricted territory. Need a VIP pass to access this area?",
            "Halt! You've reached a dead-end. Need directions to the nearest exit?",
            "Well, look who's here! Unauthorized access detected. Need a virtual tour guide?",
            "Hey there, wayfarer! This zone is for authorized personnel only. Need a key to unlock the gate?",
            "Stop right there! You've reached the end of the road. Need assistance making a U-turn?",
            "Uh-oh! You're in uncharted waters. Need a life jacket to stay afloat?",
            "Hold your horses! This area is off-limits. Need a rescue team to pull you out?",
            "Well, well, well... What brings you to this forbidden land? Need a magic spell to teleport you out?",
            "Whoopsie! Wrong turn detected. Need a compass to find your way back?",
            "Hey, stranger! You've stumbled into the lion's den. Need a shield to protect yourself?",
            "Attention, trespasser! This area is under surveillance. Need an escape route?",
            "Stop right there! You've reached the end of the road. Need a map to find your way back?",
            "Hold tight! You're in the danger zone. Need a safety net to catch you?",
            "Oh dear! You've wandered off the path. Need breadcrumbs to find your way back?",
            "Hello there! This area is restricted. Need a secret handshake to gain entry?",
            "Stop right there, criminal scum! Unauthorized access detected. Need a disguise to blend in?",
            "Uh-oh! You've entered the forbidden forest. Need a magical portal to return home?",
            "Attention, explorer! You're in uncharted territory. Need a treasure map to guide you?",
            "Who goes there? Unauthorized access detected. Need a cloak of invisibility to hide?",
            "Hold on a sec! You've entered the danger zone. Need a guardian angel to watch over you?",
            "Oops! Wrong door. Need a skeleton key to unlock the right one?",
            "Hey, hey, hey! You've stumbled into the dragon's lair. Need a dragon tamer to escort you out?",
            "Stop right there, criminal scum! Unauthorized entry detected. Need an invisibility cloak to slip away?",
            "Oh no! You've entered the maze of confusion. Need a trail of breadcrumbs to lead you home?",
            "Who dares enter this sacred ground? Unauthorized access detected. Need a time machine to turn back?",
            "Attention, intruder! You're in the danger zone. Need a guardian angel to guide you to safety?",
            "Uh-oh! You're in the twilight zone. Need a magic wand to cast a spell of return?",
            "Hold your horses! This area is off-limits. Need a golden ticket to gain entry?",
            "Well, well, well... Look who's lost in Wonderland. Need a white rabbit to show you the way back?",
            "Whoa, Nelly! You've strayed into the lion's den. Need a lion tamer to escort you out?",
            "Stop right there! You're trespassing on private property. Need a safe passage to exit?",
            "Halt! You've reached the end of the rainbow. Need a pot of gold to turn around?",
            "Oopsie daisy! Looks like you're in a pickle. Need a fairy godmother to grant your wish?",
        ];

        const randomIndex = Math.floor(Math.random() * flavourText.length);
        const chosenFlavourText = flavourText[randomIndex];

        setFlavourText(chosenFlavourText);
    });

    const navigate = useNavigate();
    return (
        <div className="mt-20 flex flex-col items-center justify-center w-screen">
            <p className="text-6xl font-semibold">Hey!</p> 
            <p className="pt-5">
                <span className="italic">{flavourText}</span>
                <br />
                The smiling lady said.
            </p>
            <div>
                <img
                    onClick={ () => navigate("/") }
                    className="cursor-pointer"
                    src={waguri}
                    alt="WaguriKaoruko"
                />
            </div>
            <p>
                Pat her head or click{" "}
                <Link
                    to={"/"}
                    className="text-blue-500 font-semibold"
                >
                    here 
                </Link>
                {" "}to return home.
            </p>
            <p className="pt-40 font-light">Error 401: <span className="text-rose-500 font-medium">Unauthorized</span></p>
        </div>
    );
}

export default Custom401;
