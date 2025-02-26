import React from "react";
import { useState } from "react";

const carousel = () => {
    const[index, setIndex] = useState(0);

    // temporary
    const items = ["1", "2", "3", "4", "5"];
    const itemsPerView = 3;
    const length = items.length;

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + length) % length);
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % length);
    };

    const visibleItems = [
        items[index % length],
        items[(index + 1) % length],
        items[(index + 2) % length]
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
            <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg">
                {visibleItems.map((item, i) => (
                    <div key={i} className="p-4 bg-black shadow-md rounded-lg">
                        {item}
                    </div>
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