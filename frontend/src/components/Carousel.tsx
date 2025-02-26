import React from "react";
import { useState } from "react";
import CrewCard from "./CrewCard";

const carousel = () => {
    const[index, setIndex] = useState(0);

    // temporary
    const crewMembers = [
        { name : "Mel", role: "Frontend", description: "a"},
        { name : "Lily", role: "Frontend", description: "b"},
        { name : "Shin", role: "Frontend", description: "c"},
        { name : "Usman", role: "Backend", description: "d"},
        { name : "Jon", role: "Backend", description: "e"},
    ];
    const length = crewMembers.length;

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + length) % length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % length);
    };

    const visibleItems = [
        crewMembers[index % length],
        crewMembers[(index + 1) % length],
        crewMembers[(index + 2) % length]
    ];

    return(
        <div className="flex items-center space-y-4">

            {/* PREVIOUS BUTTON */}
            <button
                onClick={handlePrevious}
                className="px-4 py-2 mr-5 align-middle bg-white text-black rounded-full outline-double shadow hover:bg-gray-400 transition">
                ←
            </button>

            {/* CAROUSEL ITEMS */}
            <div className="flex space-x-10 bg-gray-100 p-4 rounded-lg">
                {visibleItems.map((member, i) => (
                    <CrewCard key={i} name={member.name} role={member.role} description={member.description} />
                ))}
            </div>

            {/* NEXT BUTTON */}
            <button
                onClick={handleNext}
                className="px-4 py-2 ml-5 align-middle bg-white text-black rounded-full outline-double shadow hover:bg-gray-400 transition">
                →
            </button>
        </div>
    )
}

export default carousel;